import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Joi from "joi";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

// Defining a Joi schema for date/time consistency.
const basicSchema = Joi.object({
  startDate: Joi.date().required().label("Start Date"),
  endDate: Joi.date().required().label("End Date"),
  multiDay: Joi.boolean().required(),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .label("Start Time"),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .label("End Time"),
}).custom((value, helpers) => {
  const { startDate, endDate, multiDay, startTime, endTime } = value;
  if (multiDay) {
    if (new Date(endDate) <= new Date(startDate)) {
      return helpers.error("date.inconsistent.multi", {
        message: "For multi-day events, end date must be after starting date.",
      });
    }
  } else {
    if (
      new Date(endDate).toDateString() !== new Date(startDate).toDateString()
    ) {
      return helpers.error("date.inconsistent.single", {
        message: "For a single-day event, start and end dates must be the same.",
      });
    }
    if (startTime >= endTime) {
      return helpers.error("time.inconsistent.single", {
        message: "For a single-day event, start time must be before end time.",
      });
    }
  }
  return value;
});

const BasicInfoForm = forwardRef(({ submitAttempted, autoSave }, ref) => {
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    organizedBy: [],
    collaboratedSocieties: [],
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: "",
    multiDay: false,
    venue: "",
    coverImage: null, 
  });
  const [coverImageError, setCoverImageError] = useState("");
  const [uploadFlag, setUploadFlag] = useState(false); 

  useEffect(() => {
    if (uploadFlag) {
      if (typeof autoSave === "function") {
        autoSave();
      }
      setUploadFlag(false);
    }
  }, [uploadFlag, autoSave]);

  // Helper to render a label with a red asterisk if the field is empty.
  const renderLabel = (label, value, isArray = false) => {
    const isEmpty = isArray
      ? !value || value.length === 0
      : !value || (typeof value === "string" && !value.trim());
    return submitAttempted && isEmpty ? (
      <>
        {label} <span style={{ color: "red" }}>*</span>
      </>
    ) : (
      label
    );
  };

  // For single-day events, auto-set endDate to startDate.
  useEffect(() => {
    if (!basicInfo.multiDay && basicInfo.startDate) {
      setBasicInfo((prev) => ({ ...prev, endDate: prev.startDate }));
    }
  }, [basicInfo.multiDay, basicInfo.startDate]);

  const handleFieldChange = useCallback((field, value) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Cover image upload: check file size, upload to Cloudinary, update state,
  // and set the flag to trigger auto-save.
  const handleCoverImageChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setCoverImageError("Cover image size must be 5MB or less.");
        handleFieldChange("coverImage", null);
        return;
      } else {
        setCoverImageError("");
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/ieeegcetsb/event/upload-images",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log("Cover image upload response:", response.data);
        // Assume backend returns data in the format: { data: [{ file_name, link, public_id, ... }] }
        const uploadedData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;

        // Update the coverImage in the basicInfo state with Cloudinary data.
        handleFieldChange("coverImage", {
          file_name: uploadedData.file_name,
          link: uploadedData.link,
          public_id: uploadedData.public_id,
          dirty: false,
        });

        // Set the flag to true, triggering auto-save via the useEffect.
        setUploadFlag(true);
      } catch (error) {
        console.error("Cover image upload error:", error);
        setCoverImageError("Error uploading cover image.");
        handleFieldChange("coverImage", { caption: "", dirty: true });
      }
    }
  }, [handleFieldChange]);

  // Expose validate() and getData() to the parent.
  useImperativeHandle(ref, () => ({
    validate: () => {
      const errors = {};
      if (!basicInfo.title.trim())
        errors.title = "Event Title is required.";
      if (!basicInfo.organizedBy || basicInfo.organizedBy.length === 0)
        errors.organizedBy = "Organized By is required.";
      if (!basicInfo.startDate)
        errors.startDate = "Start Date is required.";

      if (
        basicInfo.startDate &&
        basicInfo.endDate &&
        basicInfo.startTime &&
        basicInfo.endTime
      ) {
        const { error } = basicSchema.validate({
          startDate: basicInfo.startDate,
          endDate: basicInfo.endDate,
          multiDay: basicInfo.multiDay,
          startTime: basicInfo.startTime,
          endTime: basicInfo.endTime,
        });
        if (error) {
          const type = error.details[0].type;
          if (
            type === "date.inconsistent.multi" ||
            type === "date.inconsistent.single"
          ) {
            errors.endDate = error.details[0].context?.message;
          } else if (type === "time.inconsistent.single") {
            errors.endTime = error.details[0].context?.message;
          }
        }
      }
      if (!basicInfo.startTime)
        errors.startTime = "Start Time is required.";
      if (!basicInfo.endTime)
        errors.endTime = "End Time is required.";
      if (!basicInfo.venue.trim())
        errors.venue = "Venue is required.";

      return errors;
    },
    getData: () => basicInfo,
  }));

  return (
    <Box sx={{ mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Basic Information
      </Typography>
      <TextField
        fullWidth
        label={renderLabel("Event Title", basicInfo.title)}
        value={basicInfo.title}
        onChange={(e) => handleFieldChange("title", e.target.value)}
        error={submitAttempted && !basicInfo.title.trim()}
        helperText={
          submitAttempted && !basicInfo.title.trim() && "Event Title is required."
        }
        sx={{ mb: 2 }}
        size="small"
      />
      <TextField
        fullWidth
        label={renderLabel("Organized By", basicInfo.organizedBy, true)}
        value={basicInfo.organizedBy.join(",")}
        onChange={(e) =>
          handleFieldChange(
            "organizedBy",
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          )
        }
        error={
          submitAttempted &&
          (!basicInfo.organizedBy || basicInfo.organizedBy.length === 0)
        }
        helperText={
          submitAttempted &&
          (!basicInfo.organizedBy || basicInfo.organizedBy.length === 0) &&
          "Organized By is required."
        }
        sx={{ mb: 2 }}
        size="small"
      />
      <TextField
        fullWidth
        label="Associated Societies"
        value={basicInfo.collaboratedSocieties.join(",")}
        onChange={(e) =>
          handleFieldChange(
            "collaboratedSocieties",
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          )
        }
        sx={{ mb: 2 }}
        size="small"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <DatePicker
          label={renderLabel("Start Date", basicInfo.startDate)}
          value={basicInfo.startDate ? new Date(basicInfo.startDate) : null}
          onChange={(newValue) =>
            handleFieldChange("startDate", newValue ? newValue.toISOString() : null)
          }
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              error: submitAttempted && !basicInfo.startDate,
              helperText:
                submitAttempted && !basicInfo.startDate && "Start Date is required.",
            },
          }}
        />
        {basicInfo.multiDay && (
          <DatePicker
            label={renderLabel("End Date", basicInfo.endDate)}
            value={basicInfo.endDate ? new Date(basicInfo.endDate) : null}
            onChange={(newValue) =>
              handleFieldChange("endDate", newValue ? newValue.toISOString() : null)
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: submitAttempted && basicInfo.multiDay && !basicInfo.endDate,
                helperText:
                  submitAttempted &&
                  basicInfo.multiDay &&
                  !basicInfo.endDate &&
                  "End Date is required.",
              },
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label={renderLabel("Start Time", basicInfo.startTime)}
          type="time"
          InputLabelProps={{ shrink: true }}
          value={basicInfo.startTime}
          onChange={(e) => handleFieldChange("startTime", e.target.value)}
          error={submitAttempted && !basicInfo.startTime}
          helperText={
            submitAttempted && !basicInfo.startTime && "Start Time is required."
          }
          size="small"
        />
        <TextField
          fullWidth
          label={renderLabel("End Time", basicInfo.endTime)}
          type="time"
          InputLabelProps={{ shrink: true }}
          value={basicInfo.endTime}
          onChange={(e) => handleFieldChange("endTime", e.target.value)}
          error={submitAttempted && !basicInfo.endTime}
          helperText={
            submitAttempted &&
            (!basicInfo.endTime
              ? "End Time is required."
              : !basicInfo.multiDay &&
                basicInfo.startTime &&
                basicInfo.endTime &&
                basicInfo.startTime >= basicInfo.endTime
              ? "For a single-day event, start time must be before end time."
              : "")
          }
          size="small"
        />
      </Box>
      {basicInfo.multiDay &&
        submitAttempted &&
        basicInfo.startDate &&
        basicInfo.endDate &&
        new Date(basicInfo.endDate) <= new Date(basicInfo.startDate) && (
          <Alert severity="error" sx={{ mb: 2 }} className="scroll-error">
            For multi-day events, end date must be after start date.
          </Alert>
      )}
      {!basicInfo.multiDay &&
        submitAttempted &&
        basicInfo.startDate &&
        basicInfo.endDate &&
        new Date(basicInfo.endDate).toDateString() !==
          new Date(basicInfo.startDate).toDateString() && (
          <Alert severity="error" sx={{ mb: 2 }} className="scroll-error">
            For a single-day event, start and end dates must be the same.
          </Alert>
      )}
      {(!basicInfo.multiDay &&
        submitAttempted &&
        basicInfo.startTime &&
        basicInfo.endTime &&
        basicInfo.startTime >= basicInfo.endTime) && (
          <Alert severity="error" sx={{ mb: 2 }} className="scroll-error">
            For a single-day event, start time must be before end time.
          </Alert>
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={basicInfo.multiDay}
            onChange={(e) => handleFieldChange("multiDay", e.target.checked)}
          />
        }
        label="Multi-day Event"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={renderLabel("Venue", basicInfo.venue)}
        value={basicInfo.venue}
        onChange={(e) => handleFieldChange("venue", e.target.value)}
        error={submitAttempted && !basicInfo.venue.trim()}
        helperText={
          submitAttempted && !basicInfo.venue.trim() && "Venue is required."
        }
        sx={{ mb: 2 }}
        size="small"
      />
      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Upload Cover Image
        <input type="file" accept="image/*" hidden onChange={handleCoverImageChange} />
      </Button>
      {basicInfo.coverImage && basicInfo.coverImage.file_name && (
        <Typography variant="caption">
          Uploaded cover image: {basicInfo.coverImage.file_name}
        </Typography>
      )}
      {coverImageError && <Alert severity="error">{coverImageError}</Alert>}
    </Box>
  );
});

export default BasicInfoForm;
