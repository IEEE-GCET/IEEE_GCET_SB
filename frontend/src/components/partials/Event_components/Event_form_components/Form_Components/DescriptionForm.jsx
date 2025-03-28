import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import Joi from "joi";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Joi schema for DescriptionForm.
const descriptionSchema = Joi.object({
  sections: Joi.array()
    .min(2)
    .items(
      Joi.object({
        sectionTitle: Joi.string().trim().required().label("Section Title"),
        introduction: Joi.string().trim().required().label("Introduction"),
        subsections: Joi.array()
          .min(2)
          .items(
            Joi.object({
              subsectionTitle: Joi.string()
                .trim()
                .required()
                .label("Subsection Title"),
              content: Joi.string().trim().required().label("Content"),
              images: Joi.array().items(
                Joi.object({
                  caption: Joi.string()
                    .trim()
                    .required()
                    .label("Image Caption"),
                  link: Joi.string().trim().optional().label("Image Link"),
                  public_id: Joi.string()
                    .trim()
                    .optional()
                    .label("Cloudinary ID"),
                  file_name: Joi.string().trim().optional(),
                })
              ),
            })
          )
          .min(2)
          .required()
          .label("Subsections"),
      })
    )
    .min(2)
    .required()
    .label("Sections"),
  conclusion: Joi.string().trim().required().label("Conclusion"),
});

const DescriptionForm = forwardRef(({ submitAttempted }, ref) => {
  const [description, setDescription] = useState({
    sections: [
      {
        sectionTitle: "",
        introduction: "",
        subsections: [
          { subsectionTitle: "", content: "", images: [] },
          { subsectionTitle: "", content: "", images: [] },
        ],
      },
      {
        sectionTitle: "",
        introduction: "",
        subsections: [
          { subsectionTitle: "", content: "", images: [] },
          { subsectionTitle: "", content: "", images: [] },
        ],
      },
    ],
    conclusion: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [coverImageError, setCoverImageError] = useState("");

  // Ref for debounce timer.
  const autoSaveTimeoutRef = useRef(null);

  // Debounced auto-save: saving to localStorage.
  const autoSave = (updatedDescription) => {
    localStorage.setItem("description", JSON.stringify(updatedDescription));
  };

  // useEffect triggers debounced auto-save whenever description changes and no upload is in progress.
  useEffect(() => {
    if (!isUploading) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSave(description);
      }, 500);
    }
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [isUploading, description]);

  // When an image loads, trigger auto-save (if not uploading).
  const handleImageLoaded = () => {
    if (!isUploading) {
      autoSave(description);
    }
  };

  // Validate the description using Joi.
  const validateDetails = useCallback(() => {
    const { error } = descriptionSchema.validate(description, {
      abortEarly: false,
    });
    if (!error) return {};
    const errors = {};
    error.details.forEach((detail) => {
      const path = detail.path.join(".");
      errors[path] = detail.message;
    });
    return errors;
  }, [description]);

  // Compute errors on the fly if submitAttempted is true.
  const computedErrors = submitAttempted ? validateDetails() : {};

  useImperativeHandle(ref, () => ({
    validate: () => computedErrors,
    getData: () => ({ ...description }),
  }));

  // --- Functions for handling images ---
  const handleMultipleImageUpload = async (
    sectionIndex,
    subsectionIndex,
    e
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    console.log("Selected files:", files);

    setIsUploading(true);

    const newImages = await Promise.all(
      Array.from(files).map(async (file) => {
        console.log("Uploading file:", file);
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
          console.log("Upload response:", response.data);
          const uploadedData = Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data;
          return {
            file_name: uploadedData.file_name,
            caption: "",
            link: uploadedData.link,
            public_id: uploadedData.public_id,
            uploadComplete: true,
            dirty: false,
          };
        } catch (error) {
          console.error("Upload error:", error);
          return { caption: "", dirty: true, uploadComplete: false };
        }
      })
    );

    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      const newSubsections = [...section.subsections];
      const subsection = { ...newSubsections[subsectionIndex] };
      subsection.images = [...(subsection.images || []), ...newImages];
      newSubsections[subsectionIndex] = subsection;
      section.subsections = newSubsections;
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });

    setIsUploading(false);
  };

  // Corrected updateImageField: now updating section.subsections properly.
  const updateImageField = (
    sectionIndex,
    subsectionIndex,
    imageIndex,
    field,
    value
  ) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      const newSubsections = [...section.subsections];
      const subsection = { ...newSubsections[subsectionIndex] };
      const newImages = [...(subsection.images || [])];
      newImages[imageIndex] = {
        ...newImages[imageIndex],
        [field]: value,
        dirty: true,
      };
      subsection.images = newImages;
      newSubsections[subsectionIndex] = subsection;
      // Update the section with new subsections
      section.subsections = newSubsections;
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
  };

  const moveImageInSubsection = (
    sectionIndex,
    subsectionIndex,
    imageIndex,
    direction
  ) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      const newSubsections = [...section.subsections];
      const subsection = { ...newSubsections[subsectionIndex] };
      const newImages = Array.from(subsection.images || []);
      if (direction === "up" && imageIndex > 0) {
        [newImages[imageIndex - 1], newImages[imageIndex]] = [
          newImages[imageIndex],
          newImages[imageIndex - 1],
        ];
      } else if (direction === "down" && imageIndex < newImages.length - 1) {
        [newImages[imageIndex + 1], newImages[imageIndex]] = [
          newImages[imageIndex],
          newImages[imageIndex + 1],
        ];
      }
      subsection.images = newImages;
      newSubsections[subsectionIndex] = subsection;
      section.subsections = newSubsections;
      const updatedDescription = { ...prev, sections: newSections };
      autoSave(updatedDescription);
      return updatedDescription;
    });
  };

  // Remove image manually without an API request.
  const removeImage = (sectionIndex, subsectionIndex, imageIndex) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      const newSubsections = [...section.subsections];
      const subsection = { ...newSubsections[subsectionIndex] };
      subsection.images = subsection.images.filter((_, i) => i !== imageIndex);
      newSubsections[subsectionIndex] = subsection;
      section.subsections = newSubsections;
      newSections[sectionIndex] = section;
      return { ...prev, sections: newSections };
    });
  };

  // --- Functions for sections and subsections ---
  const updateConclusion = (value) => {
    setDescription((prev) => {
      const updated = { ...prev, conclusion: value };
      autoSave(updated);
      return updated;
    });
  };

  const addSection = () => {
    setDescription((prev) => {
      const updated = {
        ...prev,
        sections: [
          ...prev.sections,
          {
            sectionTitle: "",
            introduction: "",
            subsections: [
              { subsectionTitle: "", content: "", images: [] },
              { subsectionTitle: "", content: "", images: [] },
            ],
          },
        ],
      };
      autoSave(updated);
      return updated;
    });
  };

  const removeSection = (sectionIndex) => {
    setDescription((prev) => {
      const updated = {
        ...prev,
        sections: prev.sections.filter((_, i) => i !== sectionIndex),
      };
      autoSave(updated);
      return updated;
    });
  };

  const addSubsection = (sectionIndex) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      section.subsections = [
        ...section.subsections,
        { subsectionTitle: "", content: "", images: [] },
      ];
      newSections[sectionIndex] = section;
      const updated = { ...prev, sections: newSections };
      autoSave(updated);
      return updated;
    });
  };

  const removeSubsection = (sectionIndex, subsectionIndex) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      section.subsections = section.subsections.filter(
        (_, i) => i !== subsectionIndex
      );
      newSections[sectionIndex] = section;
      const updated = { ...prev, sections: newSections };
      autoSave(updated);
      return updated;
    });
  };

  const updateSectionTitle = (sectionIndex, value) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        sectionTitle: value,
      };
      const updated = { ...prev, sections: newSections };
      autoSave(updated);
      return updated;
    });
  };

  const updateSectionIntroduction = (sectionIndex, value) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        introduction: value,
      };
      const updated = { ...prev, sections: newSections };
      autoSave(updated);
      return updated;
    });
  };

  const updateSubsectionField = (
    sectionIndex,
    subsectionIndex,
    field,
    value
  ) => {
    setDescription((prev) => {
      const newSections = [...prev.sections];
      const section = { ...newSections[sectionIndex] };
      const newSubsections = [...section.subsections];
      newSubsections[subsectionIndex] = {
        ...newSubsections[subsectionIndex],
        [field]: value,
      };
      section.subsections = newSubsections;
      newSections[sectionIndex] = section;
      const updated = { ...prev, sections: newSections };
      autoSave(updated);
      return updated;
    });
  };

  // Render required label with red asterisk.
  const renderRequiredLabel = (label, value) => {
    const isEmpty = !value || (typeof value === "string" && !value.trim());
    return submitAttempted && isEmpty ? (
      <>
        {label} <span className="text-red-500">*</span>
      </>
    ) : (
      label
    );
  };

  return (
    <Box className="p-4 border border-gray-300 rounded-lg flex flex-col gap-6">
      <Typography variant="h6" className="mb-4">
        Description
      </Typography>
      {submitAttempted && Object.keys(computedErrors).length > 0 && (
        <Alert severity="error" className="scroll-error mb-4">
          Please fix the errors in the description form.
        </Alert>
      )}
      {description.sections.map((section, sectionIndex) => (
        <Box
          key={sectionIndex}
          className="border border-gray-400 rounded-lg p-4 mb-6 flex flex-col gap-6"
        >
          <Box className="flex justify-between items-center">
            <Typography variant="subtitle1">
              Section {sectionIndex + 1}
            </Typography>
            {description.sections.length > 2 && (
              <IconButton
                onClick={() => removeSection(sectionIndex)}
                size="small"
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box className="flex flex-col gap-4">
            <TextField
              fullWidth
              label={renderRequiredLabel("Section Title", section.sectionTitle)}
              value={section.sectionTitle}
              onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
              className="mb-4"
              size="small"
            />
            <TextField
              fullWidth
              label={renderRequiredLabel("Introduction", section.introduction)}
              value={section.introduction}
              onChange={(e) =>
                updateSectionIntroduction(sectionIndex, e.target.value)
              }
              className="mb-4"
              multiline
              rows={3}
              InputProps={{ style: { height: "150px", overflowY: "auto" } }}
              size="small"
            />
          </Box>
          <Typography variant="subtitle2" className="mb-2">
            Subsections:
          </Typography>
          {section.subsections.map((subsection, subsectionIndex) => (
            <Box
              key={subsectionIndex}
              className="border border-gray-300 p-4 rounded-lg mb-6 flex flex-col gap-4"
            >
              <Box className="flex justify-between items-center">
                <Typography variant="subtitle1">
                  Subsection {subsectionIndex + 1}
                </Typography>
                {section.subsections.length > 2 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      removeSubsection(sectionIndex, subsectionIndex)
                    }
                    size="small"
                  >
                    Remove Subsection
                  </Button>
                )}
              </Box>
              <TextField
                fullWidth
                label={renderRequiredLabel(
                  "Subsection Title",
                  subsection.subsectionTitle
                )}
                value={subsection.subsectionTitle}
                onChange={(e) =>
                  updateSubsectionField(
                    sectionIndex,
                    subsectionIndex,
                    "subsectionTitle",
                    e.target.value
                  )
                }
                className="mb-2"
                size="small"
              />
              <TextField
                fullWidth
                label={renderRequiredLabel("Content", subsection.content)}
                value={subsection.content}
                onChange={(e) =>
                  updateSubsectionField(
                    sectionIndex,
                    subsectionIndex,
                    "content",
                    e.target.value
                  )
                }
                className="mb-4"
                multiline
                rows={5}
                InputProps={{ style: { height: "150px", overflowY: "auto" } }}
                size="small"
              />
              <Typography variant="subtitle2" className="mb-2">
                Images (Subsection):
              </Typography>
              <Box className="border-2 border-dashed border-gray-400 rounded-lg px-5 py-2 mb-4 hover:border-gray-600">
                <Button variant="outlined" component="label" fullWidth>
                  Upload Images
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) =>
                      handleMultipleImageUpload(
                        sectionIndex,
                        subsectionIndex,
                        e
                      )
                    }
                  />
                </Button>
              </Box>
              {/* Display images in a column */}
              <Box className="flex flex-col gap-4">
                {subsection.images &&
                  subsection.images.map((img, imageIndex) => (
                    <Box
                      key={imageIndex}
                      className="flex flex-col border border-gray-300 rounded p-3 gap-2"
                    >
                      {img.link && (
                        <img
                          src={img.link}
                          alt="Uploaded"
                          className="w-16 h-16 object-contain rounded self-center"
                          onLoad={handleImageLoaded}
                        />
                      )}
                      <TextField
                        fullWidth
                        label={renderRequiredLabel("Caption", img.caption)}
                        value={img.caption}
                        onChange={(e) =>
                          updateImageField(
                            sectionIndex,
                            subsectionIndex,
                            imageIndex,
                            "caption",
                            e.target.value
                          )
                        }
                        size="small"
                      />
                      <Box className="flex justify-between">
                        <IconButton
                          onClick={() =>
                            moveImageInSubsection(
                              sectionIndex,
                              subsectionIndex,
                              imageIndex,
                              "up"
                            )
                          }
                          size="small"
                          disabled={imageIndex === 0}
                        >
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            moveImageInSubsection(
                              sectionIndex,
                              subsectionIndex,
                              imageIndex,
                              "down"
                            )
                          }
                          size="small"
                          disabled={
                            imageIndex ===
                            (subsection.images
                              ? subsection.images.length - 1
                              : 0)
                          }
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            removeImage(
                              sectionIndex,
                              subsectionIndex,
                              imageIndex
                            )
                          }
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => addSubsection(sectionIndex)}
            size="small"
            className="mb-4"
          >
            Add Subsection
          </Button>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={addSection}
        size="small"
        className="mb-4"
      >
        Add Section
      </Button>
      <TextField
        fullWidth
        label={renderRequiredLabel("Conclusion", description.conclusion)}
        value={description.conclusion}
        onChange={(e) => updateConclusion(e.target.value)}
        multiline
        rows={4}
        InputProps={{ style: { height: "120px", overflowY: "auto" } }}
        size="small"
        className="mb-4"
      />
    </Box>
  );
});

export default DescriptionForm;
