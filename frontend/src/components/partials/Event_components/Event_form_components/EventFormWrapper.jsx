import React, { useState, useRef, useEffect, useCallback } from "react";
import FormContainer from "./Form_Components/FormContainer";
import BasicInfoForm from "./Form_Components/BasicInfoForm";
import StakeHoldersForm from "./Form_Components/StakeHoldersForm";
import DescriptionForm from "./Form_Components/DescriptionForm";
import WinnersForm from "./Form_Components/WinnersForm";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Button, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setCurrentEventForm } from "../../../../features/eventSlice";

const EventFormWrapper = () => {
  // Manage which accordion is expanded.
  const [expanded, setExpanded] = useState("basic");
  // Flag to trigger validation errors.
  const [finalSubmitAttempted, setFinalSubmitAttempted] = useState(false);
  // Local saving/loading state for autosave feedback.
  const [saving, setSaving] = useState(false);

  // Refs for child components.
  const basicRef = useRef();
  const stakeholderRef = useRef();
  const descriptionRef = useRef();
  const winnersRef = useRef();
  const containerRef = useRef();

  const dispatch = useDispatch();

  // Helper function that aggregates data from all child components.
  const aggregateData = () => ({
    ...basicRef.current.getData(),
    ...stakeholderRef.current.getData(),
    ...descriptionRef.current.getData(),
    ...winnersRef.current.getData(),
  });

  // Debounced autosave function.
  const debouncedAutoSave = useCallback(
    debounce(() => {
      const aggregatedData = aggregateData();
      // Dispatch the aggregated data to Redux.
      dispatch(setCurrentEventForm(aggregatedData));
      console.log("Autosaved event data:", { eventData: aggregatedData });
      // Simulate saving process by briefly setting saving to true.
      setSaving(true);
      setTimeout(() => setSaving(false), 500);
    }, 2000),
    [dispatch]
  );

  // Attach an onChange event to the form container so that whenever any input changes, autosave is triggered.
  const handleFormChange = () => {
    debouncedAutoSave();
  };

  // Also, save when the user leaves the route.
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Immediately save current data (blocking) before unload.
      const aggregatedData = aggregateData();
      dispatch(setCurrentEventForm(aggregatedData));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dispatch]);

  // Final submission handler.
  const handleSubmitClick = (e) => {
    e.preventDefault();
    setFinalSubmitAttempted(true);
    const basicErrors = basicRef.current.validate();
    const stakeholderErrors = stakeholderRef.current.validate();
    const descriptionErrors = descriptionRef.current.validate();
    const winnersErrors = winnersRef.current ? winnersRef.current.validate() : {};

    if (
      Object.keys(basicErrors).length === 0 &&
      Object.keys(stakeholderErrors).length === 0 &&
      Object.keys(descriptionErrors).length === 0 &&
      Object.keys(winnersErrors).length === 0
    ) {
      const aggregatedData = aggregateData();
      dispatch(setCurrentEventForm(aggregatedData));
      setSaving(true);
      // Simulate a saving delay.
      setTimeout(() => {
        console.log("Submitting aggregated event data:", { ...aggregatedData });
        setSaving(false);
        // Optionally, navigate or show a success message.
      }, 1000);
    } else {
      if (Object.keys(basicErrors).length > 0) {
        setExpanded("basic");
      } else if (Object.keys(stakeholderErrors).length > 0) {
        setExpanded("stakeholders");
      } else if (Object.keys(descriptionErrors).length > 0) {
        setExpanded("description");
      } else if (Object.keys(winnersErrors).length > 0) {
        setExpanded("winners");
      }
      setTimeout(() => {
        const firstError = containerRef.current.querySelector(
          ".MuiFormHelperText-root.Mui-error, .scroll-error"
        );
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    }
  };

  // Manual save handler.
  const handleSaveEntireDocument = (e) => {
    e.preventDefault();
    const aggregatedData = aggregateData();
    dispatch(setCurrentEventForm(aggregatedData));
    setSaving(true);
    setTimeout(() => {
      console.log("Saving entire document locally:", {...aggregatedData });
      setSaving(false);
    }, 1000);
  };

  // Navigation handlers.
  const handleBasicSaveAndNext = () => setExpanded("stakeholders");
  const handleStakeholdersSaveAndNext = () => setExpanded("description");
  const handleDescriptionSaveAndNext = () => setExpanded("winners");

  return (
    <FormContainer title="Create Event">
      {saving && (
        <Box className="fixed top-4 right-4 z-[10000]">
          <CircularProgress size={24} />
        </Box>
      )}
      <Box
        ref={containerRef}
        component="form"
        className="flex flex-col gap-6"
        onChange={handleFormChange}
        encType="multipart/form-data"
      >
        {/* Basic Info */}
        <Accordion
          expanded={expanded === "basic"}
          onChange={(event, isExpanded) => {
            if (!isExpanded) setExpanded("stakeholders");
            else setExpanded("basic");
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Basic Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicInfoForm ref={basicRef} submitAttempted={finalSubmitAttempted} />
            <div className="mt-4 flex justify-end space-x-4">
              <Button variant="contained" onClick={handleBasicSaveAndNext}>
               Next
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Stakeholders */}
        <Accordion
          expanded={expanded === "stakeholders"}
          onChange={(event, isExpanded) => {
            if (!isExpanded) setExpanded("description");
            else setExpanded("stakeholders");
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Stakeholders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StakeHoldersForm ref={stakeholderRef} submitAttempted={finalSubmitAttempted} />
            <div className="mt-4 flex justify-end">
              <Button variant="contained" onClick={handleStakeholdersSaveAndNext}>
                Next
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Description */}
        <Accordion
          expanded={expanded === "description"}
          onChange={(event, isExpanded) => {
            if (!isExpanded) setExpanded("winners");
            else setExpanded("description");
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionForm ref={descriptionRef} submitAttempted={finalSubmitAttempted} />
            <div className="mt-4 flex justify-end space-x-4">
              <Button variant="contained" onClick={handleDescriptionSaveAndNext}>
                Next
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Winners */}
        <Accordion
          expanded={expanded === "winners"}
          onChange={(event, isExpanded) => {
            if (isExpanded) setExpanded("winners");
            else setExpanded("");
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Winners</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WinnersForm ref={winnersRef} submitAttempted={finalSubmitAttempted} />
            {/* <div className="mt-4 flex justify-end space-x-4">
              <Button variant="contained" color="secondary" onClick={() => console.log("Winners Saved:", winnersRef.current.getData())}>
                Save Winners
              </Button>
            </div> */}
          </AccordionDetails>
        </Accordion>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="contained" color="success" onClick={handleSaveEntireDocument}>
            Save Event Data
          </Button>
          <Button variant="contained" onClick={handleSubmitClick}>
            Submit Event
          </Button>
        </div>
      </Box>
    </FormContainer>
  );
};

export default EventFormWrapper;
