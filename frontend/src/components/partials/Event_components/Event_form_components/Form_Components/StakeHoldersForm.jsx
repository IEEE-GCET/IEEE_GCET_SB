import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const departmentOptions = [null, "CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];
const yearOptions = [null, "1", "2", "3", "4"];

const StakeHoldersForm = forwardRef(({ submitAttempted }, ref) => {
  const initialDetails = {
    dignitaries: {
      guests: [],
      resource_person: [],
    },
    coordinators: {
      faculty: [],
      students: [],
    },
    affiliations: [],
  };

  const [details, setDetails] = useState(initialDetails);
  const [localErrors, setLocalErrors] = useState({});

  // Helper for required field labels.
  const renderLabel = (label, value) => {
    const isEmpty = !value || (typeof value === "string" && !value.trim());
    return submitAttempted && isEmpty ? (
      <>
        {label} <span className="text-red-500">*</span>
      </>
    ) : (
      label
    );
  };

  // Custom validation.
  const validateDetails = useCallback(() => {
    const newErrors = {};

    // Dignitaries validation
    ["guests", "resource_person"].forEach((subSection) => {
      if (details.dignitaries[subSection].length > 0) {
        const errorsArray = details.dignitaries[subSection].map((entry) => {
          const err = {};
          if (!entry.name.trim()) err.name = "Name is required.";
          if (!entry.designation.trim())
            err.designation = "Designation is required.";
          if (!entry.description.trim())
            err.description = "Description is required.";
          return err;
        });
        if (errorsArray.some((e) => Object.keys(e).length > 0)) {
          newErrors.dignitaries = {
            ...newErrors.dignitaries,
            [subSection]: errorsArray,
          };
        }
      }
    });

    // Coordinators validation
    if (details.coordinators.faculty.length === 0) {
      newErrors.coordinators = {
        ...newErrors.coordinators,
        faculty: "At least one faculty coordinator is required.",
      };
    } else {
      const facultyErrors = details.coordinators.faculty.map((entry) => {
        const err = {};
        if (!entry.name.trim()) err.name = "Name is required.";
        if (!entry.dept.trim()) err.dept = "Department is required.";
        if (!entry.designation.trim())
          err.designation = "Designation is required.";
        return err;
      });
      if (facultyErrors.some((e) => Object.keys(e).length > 0)) {
        newErrors.coordinators = {
          ...newErrors.coordinators,
          faculty: facultyErrors,
        };
      }
    }
    if (details.coordinators.students.length === 0) {
      newErrors.coordinators = {
        ...newErrors.coordinators,
        students: "At least one student coordinator is required.",
      };
    } else {
      const studentErrors = details.coordinators.students.map((entry) => {
        const err = {};
        if (!entry.name.trim()) err.name = "Name is required.";
        if (!entry.dept.trim()) err.dept = "Department is required.";
        if (!entry.year.trim()) err.year = "Year is required.";
        return err;
      });
      if (studentErrors.some((e) => Object.keys(e).length > 0)) {
        newErrors.coordinators = {
          ...newErrors.coordinators,
          students: studentErrors,
        };
      }
    }

    // Affiliations validation
    if (details.affiliations.length > 0) {
      const affiliationErrors = details.affiliations.map((entry) => {
        const err = {};
        if (!entry.organization.trim())
          err.organization = "Organization is required.";
        return err;
      });
      if (affiliationErrors.some((e) => Object.keys(e).length > 0)) {
        newErrors.affiliations = affiliationErrors;
      }
    }
    return newErrors;
  }, [details]);

  useEffect(() => {
    if (submitAttempted) {
      setLocalErrors(validateDetails());
    }
  }, [details, submitAttempted, validateDetails]);

  // Helper functions for immutable updates.
  const addEntry = (section, subSection) => {
    if (section === "dignitaries") {
      setDetails((prev) => ({
        ...prev,
        dignitaries: {
          ...prev.dignitaries,
          [subSection]: [
            ...prev.dignitaries[subSection],
            { name: "", designation: "", description: "" },
          ],
        },
      }));
    } else if (section === "coordinators") {
      setDetails((prev) => ({
        ...prev,
        coordinators: {
          ...prev.coordinators,
          [subSection]: [
            ...prev.coordinators[subSection],
            subSection === "faculty"
              ? { name: "", dept: "", designation: "" }
              : { name: "", dept: "", year: "" },
          ],
        },
      }));
    } else if (section === "affiliations") {
      setDetails((prev) => ({
        ...prev,
        affiliations: [
          ...prev.affiliations,
          { organization: "", sponsership: "No" },
        ],
      }));
    }
  };

  const removeEntry = (section, subSection, index) => {
    if (section === "dignitaries") {
      setDetails((prev) => ({
        ...prev,
        dignitaries: {
          ...prev.dignitaries,
          [subSection]: prev.dignitaries[subSection].filter(
            (_, i) => i !== index
          ),
        },
      }));
    } else if (section === "coordinators") {
      setDetails((prev) => ({
        ...prev,
        coordinators: {
          ...prev.coordinators,
          [subSection]: prev.coordinators[subSection].filter(
            (_, i) => i !== index
          ),
        },
      }));
    } else if (section === "affiliations") {
      setDetails((prev) => ({
        ...prev,
        affiliations: prev.affiliations.filter((_, i) => i !== index),
      }));
    }
  };

  const updateField = (section, subSection, index, field, value) => {
    if (section === "dignitaries") {
      setDetails((prev) => ({
        ...prev,
        dignitaries: {
          ...prev.dignitaries,
          [subSection]: prev.dignitaries[subSection].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ),
        },
      }));
    } else if (section === "coordinators") {
      setDetails((prev) => ({
        ...prev,
        coordinators: {
          ...prev.coordinators,
          [subSection]: prev.coordinators[subSection].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ),
        },
      }));
    }
  };

  useImperativeHandle(ref, () => ({
    validate: () => validateDetails(),
    getData: () => details,
  }));

  const handleLocalSave = (e) => {
    e.preventDefault();
    console.log("StakeHolders saved locally:", details);
  };

  return (
    <Box className="p-4 border border-gray-300 rounded-md mb-4">
      <Typography variant="h5" className="mb-4">
        Event Additional Details
      </Typography>

      {/* Dignitaries Section */}
      <Box className="border border-gray-400 rounded-md p-4 mb-4">
        <Typography variant="h6" className="mb-4">
          Dignitaries (Guests)
        </Typography>
        {details.dignitaries.guests.map((entry, index) => (
          <Box
            key={index}
            className="mb-4 p-2 border border-gray-300 rounded flex flex-col gap-2"
          >
            <Box className="flex justify-between">
              <Typography variant="subtitle1">Guest {index + 1}</Typography>
              <IconButton
                onClick={() => removeEntry("dignitaries", "guests", index)}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label={renderLabel("Name", entry.name)}
              value={entry.name}
              onChange={(e) =>
                updateField(
                  "dignitaries",
                  "guests",
                  index,
                  "name",
                  e.target.value
                )
              }
              error={
                submitAttempted &&
                Boolean(localErrors?.dignitaries?.guests?.[index]?.name)
              }
              helperText={
                submitAttempted &&
                localErrors?.dignitaries?.guests?.[index]?.name
              }
              size="small"
              InputProps={{ className: "overflow-x-auto whitespace-nowrap" }}
            />
            <TextField
              fullWidth
              label={renderLabel("Designation", entry.designation)}
              value={entry.designation}
              onChange={(e) =>
                updateField(
                  "dignitaries",
                  "guests",
                  index,
                  "designation",
                  e.target.value
                )
              }
              error={
                submitAttempted &&
                Boolean(localErrors?.dignitaries?.guests?.[index]?.designation)
              }
              helperText={
                submitAttempted &&
                localErrors?.dignitaries?.guests?.[index]?.designation
              }
              size="small"
            />
            <TextField
              fullWidth
              label={renderLabel("Description", entry.description)}
              value={entry.description}
              onChange={(e) =>
                updateField(
                  "dignitaries",
                  "guests",
                  index,
                  "description",
                  e.target.value
                )
              }
              multiline
              minRows={2}
              error={
                submitAttempted &&
                Boolean(localErrors?.dignitaries?.guests?.[index]?.description)
              }
              helperText={
                submitAttempted &&
                localErrors?.dignitaries?.guests?.[index]?.description
              }
              size="small"
              InputProps={{ className: "h-20 overflow-y-auto" }}
            />
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={() => addEntry("dignitaries", "guests")}
          size="small"
        >
          Add Guest
        </Button>
      </Box>

      {/* Coordinators Section */}
      <Box className="border border-gray-400 rounded-md p-4 mb-4">
        <Box className="flex items-center mb-4">
          <Typography variant="h6">Coordinators</Typography>
          {submitAttempted &&
            (details.coordinators.faculty.length === 0 ||
              details.coordinators.students.length === 0) && (
              <Typography variant="body2" color="error" className="ml-2">
                {details.coordinators.faculty.length === 0 &&
                  "At least one faculty coordinator is required."}
                {details.coordinators.students.length === 0 &&
                  " At least one student coordinator is required."}
              </Typography>
            )}
        </Box>
        <Box className="mb-4">
          <Typography variant="subtitle1">Faculty</Typography>
          {details.coordinators.faculty.map((entry, index) => (
            <Box
              key={index}
              className="mb-4 p-2 border border-gray-300 rounded flex flex-col gap-2"
            >
              <Box className="flex justify-between">
                <Typography variant="subtitle1">Faculty {index + 1}</Typography>
                <IconButton
                  onClick={() => removeEntry("coordinators", "faculty", index)}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                label={renderLabel("Name", entry.name)}
                value={entry.name}
                onChange={(e) =>
                  updateField(
                    "coordinators",
                    "faculty",
                    index,
                    "name",
                    e.target.value
                  )
                }
                error={
                  submitAttempted &&
                  Boolean(localErrors?.coordinators?.faculty?.[index]?.name)
                }
                helperText={
                  submitAttempted &&
                  localErrors?.coordinators?.faculty?.[index]?.name
                }
                size="small"
                InputProps={{ className: "overflow-x-auto whitespace-nowrap" }}
              />
              <TextField
                fullWidth
                label={renderLabel("Department", entry.dept)}
                select
                value={entry.dept}
                onChange={(e) =>
                  updateField(
                    "coordinators",
                    "faculty",
                    index,
                    "dept",
                    e.target.value
                  )
                }
                error={
                  submitAttempted &&
                  Boolean(localErrors?.coordinators?.faculty?.[index]?.dept)
                }
                helperText={
                  submitAttempted &&
                  localErrors?.coordinators?.faculty?.[index]?.dept
                }
                size="small"
                SelectProps={{ native: true }}
              >
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                fullWidth
                label={renderLabel("Designation", entry.designation)}
                value={entry.designation}
                onChange={(e) =>
                  updateField(
                    "coordinators",
                    "faculty",
                    index,
                    "designation",
                    e.target.value
                  )
                }
                error={
                  submitAttempted &&
                  Boolean(
                    localErrors?.coordinators?.faculty?.[index]?.designation
                  )
                }
                helperText={
                  submitAttempted &&
                  localErrors?.coordinators?.faculty?.[index]?.designation
                }
                size="small"
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => addEntry("coordinators", "faculty")}
            size="small"
          >
            Add Faculty
          </Button>
        </Box>
        <Box>
          <Typography variant="subtitle1">Students</Typography>
          {details.coordinators.students.map((entry, index) => (
            <Box
              key={index}
              className="mb-4 p-2 border border-gray-300 rounded flex flex-col gap-2"
            >
              <Box className="flex justify-between">
                <Typography variant="subtitle1">Student {index + 1}</Typography>
                <IconButton
                  onClick={() => removeEntry("coordinators", "students", index)}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                label={renderLabel("Name", entry.name)}
                value={entry.name}
                onChange={(e) =>
                  updateField(
                    "coordinators",
                    "students",
                    index,
                    "name",
                    e.target.value
                  )
                }
                error={
                  submitAttempted &&
                  Boolean(localErrors?.coordinators?.students?.[index]?.name)
                }
                helperText={
                  submitAttempted &&
                  localErrors?.coordinators?.students?.[index]?.name
                }
                size="small"
                InputProps={{ className: "overflow-x-auto whitespace-nowrap" }}
              />
              <TextField
                fullWidth
                label={renderLabel("Department", entry.dept)}
                select
                value={entry.dept}
                onChange={(e) =>
                  updateField(
                    "coordinators",
                    "students",
                    index,
                    "dept",
                    e.target.value
                  )
                }
                error={
                  submitAttempted &&
                  Boolean(localErrors?.coordinators?.students?.[index]?.dept)
                }
                helperText={
                  submitAttempted &&
                  localErrors?.coordinators?.students?.[index]?.dept
                }
                size="small"
                SelectProps={{ native: true }}
              >
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <TextField
                fullWidth
                label={renderLabel("Year", entry.year)}
                select
                value={entry.year}
                onChange={(e) =>
                  updateField(
                    "coordinators",
                    "students",
                    index,
                    "year",
                    e.target.value
                  )
                }
                error={
                  submitAttempted &&
                  Boolean(localErrors?.coordinators?.students?.[index]?.year)
                }
                helperText={
                  submitAttempted &&
                  localErrors?.coordinators?.students?.[index]?.year
                }
                size="small"
                SelectProps={{ native: true }}
              >
                {yearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => addEntry("coordinators", "students")}
            size="small"
          >
            Add Student
          </Button>
        </Box>
      </Box>

      {/* Affiliations Section */}
      <Box className="border border-gray-400 rounded-md p-4 mb-4">
        <Typography variant="h6" className="mb-4">
          Affiliations
        </Typography>
        {details.affiliations.map((entry, index) => (
          <Box
            key={index}
            className="mb-4 p-2 border border-gray-300 rounded flex flex-col gap-2"
          >
            <Box className="flex justify-between">
              <Typography variant="subtitle1">
                Affiliation {index + 1}
              </Typography>
              <IconButton
                onClick={() => removeEntry("affiliations", null, index)}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label={renderLabel("Organization", entry.organization)}
              value={entry.organization}
              onChange={(e) => {
                const newVal = e.target.value;
                setDetails((prev) => ({
                  ...prev,
                  affiliations: prev.affiliations.map((aff, i) =>
                    i === index ? { ...aff, organization: newVal } : aff
                  ),
                }));
              }}
              error={
                submitAttempted &&
                Boolean(localErrors?.affiliations?.[index]?.organization)
              }
              helperText={
                submitAttempted &&
                localErrors?.affiliations?.[index]?.organization
              }
              size="small"
              InputProps={{ className: "overflow-x-auto whitespace-nowrap" }}
            />
            <TextField
              fullWidth
              select
              label="Sponsership"
              value={entry.sponsership}
              onChange={(e) => {
                const newVal = e.target.value;
                setDetails((prev) => ({
                  ...prev,
                  affiliations: prev.affiliations.map((aff, i) =>
                    i === index ? { ...aff, sponsership: newVal } : aff
                  ),
                }));
              }}
              size="small"
              SelectProps={{ native: true }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </TextField>
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={() => addEntry("affiliations")}
          size="small"
        >
          Add Affiliation
        </Button>
      </Box>
{/* 
      <Box className="mt-4 flex justify-end">
        <Button
          onClick={handleLocalSave}
          variant="contained"
          color="secondary"
          size="small"
        >
          Save Stakeholders
        </Button>
      </Box> */}
    </Box>
  );
});

export default StakeHoldersForm;
