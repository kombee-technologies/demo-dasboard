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

// Interface for employee data (matching EmployeeTable)
interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  salary: string;
  status: string;
}

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.shape.borderRadius,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  boxShadow: theme.shadows[2],
  transition: "all 0.2s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
    padding: theme.spacing(1, 2),
  },
}));

const CancelButton = styled(StyledButton)(({ theme }) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.light,
    borderColor: theme.palette.error.dark,
    transform: "translateY(-1px)",
  },
}));

const SubmitButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: "#bf08fb",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "#9c06c9",
    boxShadow: theme.shadows[4],
    transform: "translateY(-1px)",
  },
}));

interface AddEditEmployeeDetailsProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee;
  onSubmit: (employee: Employee) => void;
}

const AddEditEmployeeDetails: React.FC<AddEditEmployeeDetailsProps> = ({
  open,
  onClose,
  employee,
  onSubmit,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    joinDate: "",
    salary: "",
    status: "Active",
  });

  // Validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    joinDate: "",
    salary: "",
  });

  // Initialize form with employee data if editing
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        joinDate: employee.joinDate,
        salary: employee.salary.replace("$", "").replace(",", ""),
        status: employee.status,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
        department: "",
        joinDate: "",
        salary: "",
        status: "Active",
      });
    }
    setErrors({
      name: "",
      email: "",
      position: "",
      department: "",
      joinDate: "",
      salary: "",
    });
  }, [employee, open]);

  // Validation function
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      position: "",
      department: "",
      joinDate: "",
      salary: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
      isValid = false;
    }

    if (!formData.joinDate) {
      newErrors.joinDate = "Join date is required";
      isValid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.joinDate)) {
      newErrors.joinDate = "Invalid date format (YYYY-MM-DD)";
      isValid = false;
    }

    if (!formData.salary.trim()) {
      newErrors.salary = "Salary is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.salary)) {
      newErrors.salary = "Salary must be a valid number";
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
    setFormData((prev) => ({ ...prev, [name as string]: value as string }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const formattedSalary = `$${parseInt(formData.salary).toLocaleString()}`;
      onSubmit({
        id: employee ? employee.id : Date.now(),
        ...formData,
        salary: formattedSalary,
      });
      onClose();
    }
  };

  // Department and Status options
  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Human Resources",
    "Marketing",
    "Analytics",
    "Sales",
    "Finance",
  ];
  const statuses = ["Active", "On Leave", "Terminated"];

  return (
    <>
      {open && (
        <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ position: "relative" }}>
            <Typography variant="h5" fontWeight={600}>
              {employee ? "Edit Employee" : "Add Employee"}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: theme.spacing(1),
                top: theme.spacing(1),
                color: theme.palette.grey[500],
                "&:hover": {
                  color: theme.palette.grey[700],
                  transform: "rotate(90deg)",
                  transition: "transform 0.2s ease-in-out",
                },
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
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    size={isMobile ? "small" : "medium"}
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
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    select
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    error={!!errors.department}
                    helperText={errors.department}
                    size={isMobile ? "small" : "medium"}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </StyledTextField>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    fullWidth
                    label="Join Date"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={handleChange}
                    error={!!errors.joinDate}
                    helperText={errors.joinDate}
                    size={isMobile ? "small" : "medium"}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    fullWidth
                    label="Salary (USD)"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    error={!!errors.salary}
                    helperText={errors.salary}
                    size={isMobile ? "small" : "medium"}
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
                    size={isMobile ? "small" : "medium"}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </StyledTextField>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <CancelButton variant="outlined" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton variant="contained" onClick={handleSubmit}>
              {employee ? "Update" : "Add"}
            </SubmitButton>
          </DialogActions>
        </StyledDialog>
      )}
    </>
  );
};

export default AddEditEmployeeDetails;
