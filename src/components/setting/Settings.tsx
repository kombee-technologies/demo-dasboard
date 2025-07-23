import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// Styled Components
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  "& .MuiTabs-indicator": {
    background: `linear-gradient(45deg, #bf08fb 30%, #9c06c9 90%)`,
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
  background: `linear-gradient(45deg, #bf08fb 30%, #9c06c9 90%)`,
  color: theme.palette.common.white,
  fontWeight: 600,
  boxShadow: theme.shadows[4],
  "&:hover": {
    background: `linear-gradient(45deg, #9c06c9 30%, #bf08fb 90%)`,
    boxShadow: theme.shadows[6],
    transform: "translateY(-2px)",
  },
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

// Interface for settings data
interface SettingsData {
  companyName: string;
  currency: string;
  timeZone: string;
  attendanceStatuses: string[];
  payrollStatuses: string[];
  recruitmentStatuses: string[];
  leaveTypes: string[];
  leaveStatuses: string[];
}

// Type for errors object
interface Errors {
  companyName: string;
  currency: string;
  timeZone: string;
  attendanceStatus: string;
  payrollStatus: string;
  recruitmentStatus: string;
  leaveType: string;
  leaveStatus: string;
}

const Settings: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);

  // Initial settings state
  const [settings, setSettings] = useState<SettingsData>({
    companyName: "Example Corp",
    currency: "USD",
    timeZone: "UTC",
    attendanceStatuses: ["Present", "Absent", "Late"],
    payrollStatuses: ["Processed", "Pending", "Failed"],
    recruitmentStatuses: ["Hired", "In Review", "Rejected"],
    leaveTypes: ["Annual", "Sick", "Personal", "Maternity", "Paternity"],
    leaveStatuses: ["Approved", "Pending", "Rejected"],
  });

  // Form states for adding new items
  const [newAttendanceStatus, setNewAttendanceStatus] = useState("");
  const [newPayrollStatus, setNewPayrollStatus] = useState("");
  const [newRecruitmentStatus, setNewRecruitmentStatus] = useState("");
  const [newLeaveType, setNewLeaveType] = useState("");
  const [newLeaveStatus, setNewLeaveStatus] = useState("");

  // Error states
  const [errors, setErrors] = useState<Errors>({
    companyName: "",
    currency: "",
    timeZone: "",
    attendanceStatus: "",
    payrollStatus: "",
    recruitmentStatus: "",
    leaveType: "",
    leaveStatus: "",
  });

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Validation function for general settings
  const validateGeneralSettings = () => {
    const newErrors: Errors = {
      companyName: "",
      currency: "",
      timeZone: "",
      attendanceStatus: "",
      payrollStatus: "",
      recruitmentStatus: "",
      leaveType: "",
      leaveStatus: "",
    };
    let isValid = true;

    if (!settings.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
      isValid = false;
    }

    if (!settings.currency.trim()) {
      newErrors.currency = "Currency is required";
      isValid = false;
    } else if (!/^[A-Z]{3}$/.test(settings.currency)) {
      newErrors.currency = "Currency must be a 3-letter code (e.g., USD)";
      isValid = false;
    }

    if (!settings.timeZone.trim()) {
      newErrors.timeZone = "Time Zone is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validation function for status or type
  const validateStatusOrType = (value: string, field: keyof Errors) => {
    const newErrors = { ...errors };
    if (!value.trim()) {
      newErrors[field] = `${field
        .replace(/([A-Z])/g, " $1")
        .trim()} is required`;
      setErrors(newErrors);
      return false;
    }
    if (value.length > 50) {
      newErrors[field] = `${field
        .replace(/([A-Z])/g, " $1")
        .trim()} must be less than 50 characters`;
      setErrors(newErrors);
      return false;
    }
    newErrors[field] = "";
    setErrors(newErrors);
    return true;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name as string]: value as string }));
  };

  // Handle adding new items
  const handleAddAttendanceStatus = () => {
    if (validateStatusOrType(newAttendanceStatus, "attendanceStatus")) {
      setSettings((prev) => ({
        ...prev,
        attendanceStatuses: [...prev.attendanceStatuses, newAttendanceStatus],
      }));
      setNewAttendanceStatus("");
    }
  };

  const handleAddPayrollStatus = () => {
    if (validateStatusOrType(newPayrollStatus, "payrollStatus")) {
      setSettings((prev) => ({
        ...prev,
        payrollStatuses: [...prev.payrollStatuses, newPayrollStatus],
      }));
      setNewPayrollStatus("");
    }
  };

  const handleAddRecruitmentStatus = () => {
    if (validateStatusOrType(newRecruitmentStatus, "recruitmentStatus")) {
      setSettings((prev) => ({
        ...prev,
        recruitmentStatuses: [
          ...prev.recruitmentStatuses,
          newRecruitmentStatus,
        ],
      }));
      setNewRecruitmentStatus("");
    }
  };

  const handleAddLeaveType = () => {
    if (validateStatusOrType(newLeaveType, "leaveType")) {
      setSettings((prev) => ({
        ...prev,
        leaveTypes: [...prev.leaveTypes, newLeaveType],
      }));
      setNewLeaveType("");
    }
  };

  const handleAddLeaveStatus = () => {
    if (validateStatusOrType(newLeaveStatus, "leaveStatus")) {
      setSettings((prev) => ({
        ...prev,
        leaveStatuses: [...prev.leaveStatuses, newLeaveStatus],
      }));
      setNewLeaveStatus("");
    }
  };

  // Handle deleting items
  const handleDeleteAttendanceStatus = (status: string) => {
    setSettings((prev) => ({
      ...prev,
      attendanceStatuses: prev.attendanceStatuses.filter((s) => s !== status),
    }));
  };

  const handleDeletePayrollStatus = (status: string) => {
    setSettings((prev) => ({
      ...prev,
      payrollStatuses: prev.payrollStatuses.filter((s) => s !== status),
    }));
  };

  const handleDeleteRecruitmentStatus = (status: string) => {
    setSettings((prev) => ({
      ...prev,
      recruitmentStatuses: prev.recruitmentStatuses.filter((s) => s !== status),
    }));
  };

  const handleDeleteLeaveType = (type: string) => {
    setSettings((prev) => ({
      ...prev,
      leaveTypes: prev.leaveTypes.filter((t) => t !== type),
    }));
  };

  const handleDeleteLeaveStatus = (status: string) => {
    setSettings((prev) => ({
      ...prev,
      leaveStatuses: prev.leaveStatuses.filter((s) => s !== status),
    }));
  };

  // Handle save settings
  const handleSave = () => {
    if (validateGeneralSettings()) {
      console.log("Settings saved:", settings);
      // Implement API call or state update logic here
    }
  };

  return (
    <StyledBox>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight={700}
        color="text.primary"
        sx={{ mb: 3 }}
      >
        Settings
      </Typography>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="settings tabs"
      >
        <Tab label="General" />
        <Tab label="Attendance" />
        <Tab label="Payroll" />
        <Tab label="Recruitment" />
        <Tab label="Leave" />
      </StyledTabs>
      <Box sx={{ mt: 4 }}>
        {tabValue === 0 && (
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                error={!!errors.currency}
                helperText={errors.currency}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Time Zone"
                name="timeZone"
                value={settings.timeZone}
                onChange={handleChange}
                error={!!errors.timeZone}
                helperText={errors.timeZone}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  justifyContent: "flex-end",
                }}
              >
                <CancelButton
                  variant="contained"
                  onClick={() => console.log("Cancel settings")}
                  fullWidth={isMobile}
                >
                  Cancel
                </CancelButton>
                <StyledButton
                  variant="contained"
                  onClick={handleSave}
                  fullWidth={isMobile}
                >
                  Save
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Attendance Statuses
            </Typography>
            <List>
              {settings.attendanceStatuses.map((status) => (
                <ListItem
                  key={status}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.grey[100]}`,
                    "&:hover": {
                      background: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[1],
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemText primary={status} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteAttendanceStatus(status)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", gap: 2, mt: 2, alignItems: "flex-start" }}
            >
              <StyledTextField
                label="New Status"
                value={newAttendanceStatus}
                onChange={(e) => setNewAttendanceStatus(e.target.value)}
                error={!!errors.attendanceStatus}
                helperText={errors.attendanceStatus}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <StyledButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAttendanceStatus}
              >
                Add
              </StyledButton>
            </Box>
          </Box>
        )}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Payroll Statuses
            </Typography>
            <List>
              {settings.payrollStatuses.map((status) => (
                <ListItem
                  key={status}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.grey[100]}`,
                    "&:hover": {
                      background: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[1],
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemText primary={status} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeletePayrollStatus(status)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", gap: 2, mt: 2, alignItems: "flex-start" }}
            >
              <StyledTextField
                label="New Status"
                value={newPayrollStatus}
                onChange={(e) => setNewPayrollStatus(e.target.value)}
                error={!!errors.payrollStatus}
                helperText={errors.payrollStatus}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <StyledButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPayrollStatus}
              >
                Add
              </StyledButton>
            </Box>
          </Box>
        )}
        {tabValue === 3 && (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Recruitment Statuses
            </Typography>
            <List>
              {settings.recruitmentStatuses.map((status) => (
                <ListItem
                  key={status}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.grey[100]}`,
                    "&:hover": {
                      background: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[1],
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemText primary={status} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteRecruitmentStatus(status)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", gap: 2, mt: 2, alignItems: "flex-start" }}
            >
              <StyledTextField
                label="New Status"
                value={newRecruitmentStatus}
                onChange={(e) => setNewRecruitmentStatus(e.target.value)}
                error={!!errors.recruitmentStatus}
                helperText={errors.recruitmentStatus}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <StyledButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddRecruitmentStatus}
              >
                Add
              </StyledButton>
            </Box>
          </Box>
        )}
        {tabValue === 4 && (
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Leave Types
            </Typography>
            <List>
              {settings.leaveTypes.map((type) => (
                <ListItem
                  key={type}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.grey[100]}`,
                    "&:hover": {
                      background: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[1],
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemText primary={type} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteLeaveType(type)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", gap: 2, mt: 2, alignItems: "flex-start" }}
            >
              <StyledTextField
                label="New Leave Type"
                value={newLeaveType}
                onChange={(e) => setNewLeaveType(e.target.value)}
                error={!!errors.leaveType}
                helperText={errors.leaveType}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <StyledButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddLeaveType}
              >
                Add
              </StyledButton>
            </Box>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
              Leave Statuses
            </Typography>
            <List>
              {settings.leaveStatuses.map((status) => (
                <ListItem
                  key={status}
                  sx={{
                    borderBottom: `1px solid ${theme.palette.grey[100]}`,
                    "&:hover": {
                      background: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[1],
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemText primary={status} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteLeaveStatus(status)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", gap: 2, mt: 2, alignItems: "flex-start" }}
            >
              <StyledTextField
                label="New Status"
                value={newLeaveStatus}
                onChange={(e) => setNewLeaveStatus(e.target.value)}
                error={!!errors.leaveStatus}
                helperText={errors.leaveStatus}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <StyledButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddLeaveStatus}
              >
                Add
              </StyledButton>
            </Box>
          </Box>
        )}
      </Box>
    </StyledBox>
  );
};

export default Settings;
