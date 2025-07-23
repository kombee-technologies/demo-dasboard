import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// Interface for recruitment data (aligned with RecruitmentTable)
interface Recruitment {
  id: number;
  candidateName: string;
  candidateId: number;
  position: string;
  applicationDate: string;
  status: string;
  interviewer: string;
}

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 2,
    padding: theme.spacing(3),
    background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
    boxShadow: theme.shadows[8],
    transition: "all 0.3s ease-in-out",
    transform: "scale(0.95)",
    "& .MuiDialogTitle-root": {
      padding: theme.spacing(2, 3),
    },
    "& .MuiDialogContent-root": {
      padding: theme.spacing(3),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      width: "100%",
      padding: theme.spacing(2),
    },
  },
  "&.MuiDialog-root": {
    backdropFilter: "blur(4px)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: 1.5,
    background: theme.palette.background.default,
    transition: "all 0.3s ease",
    "&:hover": {
      background: theme.palette.grey[50],
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[1],
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 8px ${theme.palette.primary.light}`,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
    fontWeight: 500,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 1.5,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
    padding: theme.spacing(0.75, 2),
  },
}));

const CancelButton = styled(StyledButton)(({ theme }) => ({
  background: theme.palette.grey[100],
  color: theme.palette.text.primary,
  "&:hover": {
    background: theme.palette.grey[200],
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
}));

const SubmitButton = styled(StyledButton)(({ theme }) => ({
  background: `linear-gradient(45deg, #bf08fb 30%, #9c06c9 90%)`,
  color: theme.palette.common.white,
  "&:hover": {
    background: `linear-gradient(45deg, #9c06c9 30%, #bf08fb 90%)`,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
}));

interface AddEditRecruitmentDetailsProps {
  open: boolean;
  onClose: () => void;
  recruitment?: Recruitment;
  onSubmit: (recruitment: Recruitment) => void;
}

const AddEditRecruitmentDetails: React.FC<AddEditRecruitmentDetailsProps> = ({
  open,
  onClose,
  recruitment,
  onSubmit,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form state
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateId: 0,
    position: "",
    applicationDate: "",
    status: "In Review",
    interviewer: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({
    candidateName: "",
    candidateId: "",
    position: "",
    applicationDate: "",
    status: "",
    interviewer: "",
  });

  // Initialize form with recruitment data if editing
  useEffect(() => {
    if (recruitment) {
      setFormData({
        candidateName: recruitment.candidateName,
        candidateId: recruitment.candidateId,
        position: recruitment.position,
        applicationDate: recruitment.applicationDate,
        status: recruitment.status,
        interviewer: recruitment.interviewer,
      });
    } else {
      setFormData({
        candidateName: "",
        candidateId: 0,
        position: "",
        applicationDate: "",
        status: "In Review",
        interviewer: "",
      });
    }
    setErrors({
      candidateName: "",
      candidateId: "",
      position: "",
      applicationDate: "",
      status: "",
      interviewer: "",
    });
  }, [recruitment, open]);

  // Validation function
  const validateForm = () => {
    const newErrors = {
      candidateName: "",
      candidateId: "",
      position: "",
      applicationDate: "",
      status: "",
      interviewer: "",
    };
    let isValid = true;

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = "Candidate Name is required";
      isValid = false;
    }

    if (!formData.candidateId) {
      newErrors.candidateId = "Candidate ID is required";
      isValid = false;
    } else if (isNaN(formData.candidateId) || formData.candidateId <= 0) {
      newErrors.candidateId = "Candidate ID must be a positive number";
      isValid = false;
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
      isValid = false;
    }

    if (!formData.applicationDate) {
      newErrors.applicationDate = "Application Date is required";
      isValid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.applicationDate)) {
      newErrors.applicationDate = "Invalid date format (YYYY-MM-DD)";
      isValid = false;
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    if (!formData.interviewer.trim()) {
      newErrors.interviewer = "Interviewer is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name === "candidateId") {
      setFormData((prev) => ({ ...prev, [name as string]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name as string]: value as string }));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        id: recruitment ? recruitment.id : Date.now(),
        ...formData,
      });
      onClose();
    }
  };

  // Status options
  const statuses = ["Hired", "In Review", "Rejected"];

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionProps={{
        onEntering: (node: HTMLElement) => {
          node.style.transform = "scale(1)";
        },
      }}
    >
      <DialogTitle sx={{ position: "relative", pb: 3 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          color="text.primary"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {recruitment ? "Edit Recruitment" : "Add Recruitment"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: theme.spacing(2),
            top: theme.spacing(2),
            color: theme.palette.grey[500],
            background: theme.palette.grey[100],
            "&:hover": {
              color: theme.palette.grey[700],
              background: theme.palette.grey[200],
              transform: "rotate(90deg)",
              boxShadow: theme.shadows[2],
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Candidate Name"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleChange}
                error={!!errors.candidateName}
                helperText={errors.candidateName}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Candidate ID"
                name="candidateId"
                type="number"
                value={formData.candidateId}
                onChange={handleChange}
                error={!!errors.candidateId}
                helperText={errors.candidateId}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                error={!!errors.position}
                helperText={errors.position}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Application Date"
                name="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={handleChange}
                error={!!errors.applicationDate}
                helperText={errors.applicationDate}
                size={isMobile ? "small" : "medium"}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                error={!!errors.status}
                helperText={errors.status}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              >
                {statuses.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{
                      "&:hover": {
                        background: theme.palette.action.hover,
                        transform: "translateX(4px)",
                        transition: "all 0.2s ease",
                      },
                    }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Interviewer"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                error={!!errors.interviewer}
                helperText={errors.interviewer}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ gap: 2, justifyContent: "flex-end" }}>
        <CancelButton
          variant="contained"
          onClick={onClose}
          fullWidth={isMobile}
        >
          Cancel
        </CancelButton>
        <SubmitButton
          variant="contained"
          onClick={handleSubmit}
          fullWidth={isMobile}
        >
          {recruitment ? "Update" : "Add"}
        </SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddEditRecruitmentDetails;