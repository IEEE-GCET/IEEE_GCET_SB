import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import Joi from "joi";
import { Box, Typography, TextField, Button, IconButton, Alert, FormControlLabel, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Define the Joi schema for winners.
const winnersSchema = Joi.object({
  winners: Joi.array().items(
    Joi.object({
      title: Joi.string().trim().required().label("Winner Title"),
      position: Joi.string()
        .valid("1", "2", "3", "4", "5", "6", "7", "8", "9", "10")
        .required()
        .label("Position"),
      participants: Joi.array().min(1).items(
        Joi.object({
          name: Joi.string().trim().required().label("Participant Name"),
          dept: Joi.string()
            .valid("CSE", "IT", "ECE", "EEE", "MECH", "CIVIL")
            .required()
            .label("Department"),
          year: Joi.string()
            .valid("1", "2", "3", "4")
            .required()
            .label("Year"),
        })
      ).required().label("Participants"),
    })
  ).optional(),
});

const WinnersForm = forwardRef(({ submitAttempted }, ref) => {
  // Track if event has winners.
  const [hasWinners, setHasWinners] = useState(false);
  // Winners data: an object with winners array.
  const [winnersData, setWinnersData] = useState({ winners: [] });
  const [localErrors, setLocalErrors] = useState({});

  // When the toggle changes, if set to false, clear winners.
  const handleToggle = (e) => {
    setHasWinners(e.target.checked);
    if (!e.target.checked) {
      setWinnersData({ winners: [] });
    }
  };

  // Winner validation using Joi.
  const validateDetails = useCallback(() => {
    // If no winners, return an empty object.
    if (!hasWinners) return {};
    const { error } = winnersSchema.validate(winnersData, { abortEarly: false });
    if (!error) return {};
    const errors = {};
    error.details.forEach((detail) => {
      const path = detail.path.join(".");
      errors[path] = detail.message;
    });
    return errors;
  }, [winnersData, hasWinners]);

  useEffect(() => {
    if (submitAttempted) {
      setLocalErrors(validateDetails());
    }
  }, [winnersData, submitAttempted, validateDetails]);

  // Expose validate() and getData() to parent.
  useImperativeHandle(ref, () => ({
    validate: () => validateDetails(),
    getData: () => (hasWinners ? winnersData : { winners: [] }),
  }));

  // Winner update functions.
  const updateWinnerField = (index, field, value) => {
    setWinnersData((prev) => {
      const newWinners = [...prev.winners];
      newWinners[index] = { ...newWinners[index], [field]: value };
      return { ...prev, winners: newWinners };
    });
  };

  const addWinner = () => {
    setWinnersData((prev) => ({
      ...prev,
      winners: [
        ...prev.winners,
        { title: "", position: "", participants: [{ name: "", dept: "", year: "" }] },
      ],
    }));
  };

  const removeWinner = (index) => {
    setWinnersData((prev) => ({
      ...prev,
      winners: prev.winners.filter((_, i) => i !== index),
    }));
  };

  // Participant update functions.
  const updateParticipantField = (winnerIndex, participantIndex, field, value) => {
    setWinnersData((prev) => {
      const newWinners = [...prev.winners];
      const winner = { ...newWinners[winnerIndex] };
      const newParticipants = [...winner.participants];
      newParticipants[participantIndex] = { ...newParticipants[participantIndex], [field]: value };
      winner.participants = newParticipants;
      newWinners[winnerIndex] = winner;
      return { ...prev, winners: newWinners };
    });
  };

  const addParticipant = (winnerIndex) => {
    setWinnersData((prev) => {
      const newWinners = [...prev.winners];
      const winner = { ...newWinners[winnerIndex] };
      winner.participants = [
        ...winner.participants,
        { name: "", dept: "", year: "" },
      ];
      newWinners[winnerIndex] = winner;
      return { ...prev, winners: newWinners };
    });
  };

  const removeParticipant = (winnerIndex, participantIndex) => {
    setWinnersData((prev) => {
      const newWinners = [...prev.winners];
      const winner = { ...newWinners[winnerIndex] };
      winner.participants = winner.participants.filter((_, i) => i !== participantIndex);
      newWinners[winnerIndex] = winner;
      return { ...prev, winners: newWinners };
    });
  };

  // UI helper for required label.
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
    <Box className="p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
      <Typography variant="h6">Winners</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={hasWinners}
            onChange={handleToggle}
            color="primary"
          />
        }
        label="Does this event have any winners?"
      />
      {hasWinners && (
        <>
          {submitAttempted && Object.keys(localErrors).length > 0 && (
            <Alert severity="error" className="scroll-error">
              Please fix the errors in the winners form.
            </Alert>
          )}
          {winnersData.winners.map((winner, winnerIndex) => (
            <Box key={winnerIndex} className="border border-gray-400 rounded-lg p-4 flex flex-col gap-4">
              <Box className="flex justify-between items-center">
                <Typography variant="subtitle1">
                  Winner {winnerIndex + 1}
                </Typography>
                <IconButton
                  variant="outlined"
                  color="error"
                  onClick={() => removeWinner(winnerIndex)}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                label={renderRequiredLabel("Winner Title", winner.title)}
                value={winner.title}
                onChange={(e) => updateWinnerField(winnerIndex, "title", e.target.value)}
                size="small"
              />
              <TextField
                fullWidth
                label={renderRequiredLabel("Position", winner.position)}
                value={winner.position}
                onChange={(e) => updateWinnerField(winnerIndex, "position", e.target.value)}
                select
                SelectProps={{ native: true }}
                size="small"
              >
                <option value="" disabled hidden>
                  
                </option>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </TextField>
              <Typography variant="subtitle2">Participants:</Typography>
              {winner.participants.map((participant, participantIndex) => (
                <Box key={participantIndex} className="border border-gray-300 rounded p-2 flex flex-col gap-2">
                  <Box className="flex justify-between items-center">
                    <Typography variant="subtitle2">
                      Participant {participantIndex + 1}
                    </Typography>
                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => removeParticipant(winnerIndex, participantIndex)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label={renderRequiredLabel("Name", participant.name)}
                    value={participant.name}
                    onChange={(e) =>
                      updateParticipantField(winnerIndex, participantIndex, "name", e.target.value)
                    }
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label={renderRequiredLabel("Department", participant.dept)}
                    value={participant.dept}
                    onChange={(e) =>
                      updateParticipantField(winnerIndex, participantIndex, "dept", e.target.value)
                    }
                    select
                    SelectProps={{ native: true }}
                    size="small"
                  >
                    <option value="" disabled hidden>
                      
                    </option>
                    {["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"].map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label={renderRequiredLabel("Year", participant.year)}
                    value={participant.year}
                    onChange={(e) =>
                      updateParticipantField(winnerIndex, participantIndex, "year", e.target.value)
                    }
                    select
                    SelectProps={{ native: true }}
                    size="small"
                  >
                    <option value="" disabled hidden>
                      {""}
                    </option>
                    {["1", "2", "3", "4"].map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </TextField>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() => addParticipant(winnerIndex)}
                size="small"
              >
                Add Participant
              </Button>
            </Box>
          ))}
          <Button variant="outlined" onClick={addWinner} size="small">
            Add Winner
          </Button>
        </>
      )}
    </Box>
  );
});

export default WinnersForm;
