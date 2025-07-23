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

// Interface for payroll data (aligned with PayrollTable)
interface Payroll {
  id: number;
  employeeName: string;
  employeeId: number;
  payPeriod: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: string;
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

interface AddEditPayrollDetailsProps {
  open: boolean;
  onClose: () => void;
  payroll?: Payroll;
  onSubmit: (payroll: Payroll) => void;
}

const AddEditPayrollDetails: React.FC<AddEditPayrollDetailsProps> = ({
  open,
  onClose,
  payroll,
  onSubmit,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form state
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: 0,
    payPeriod: "",
    grossPay: 0,
    deductions: 0,
    netPay: 0,
    status: "Pending",
  });

  // Validation errors
  const [errors, setErrors] = useState({
    employeeName: "",
    employeeId: "",
    payPeriod: "",
    grossPay: "",
    deductions: "",
    netPay: "",
    status: "",
  });

  // Initialize form with payroll data if editing
  useEffect(() => {
    if (payroll) {
      setFormData({
        employeeName: payroll.employeeName,
        employeeId: payroll.employeeId,
        payPeriod: payroll.payPeriod,
        grossPay: payroll.grossPay,
        deductions: payroll.deductions,
        netPay: payroll.netPay,
        status: payroll.status,
      });
    } else {
      setFormData({
        employeeName: "",
        employeeId: 0,
        payPeriod: "",
        grossPay: 0,
        deductions: 0,
        netPay: 0,
        status: "Pending",
      });
    }
    setErrors({
      employeeName: "",
      employeeId: "",
      payPeriod: "",
      grossPay: "",
      deductions: "",
      netPay: "",
      status: "",
    });
  }, [payroll, open]);

  // Validation function
  const validateForm = () => {
    const newErrors = {
      employeeName: "",
      employeeId: "",
      payPeriod: "",
      grossPay: "",
      deductions: "",
      netPay: "",
      status: "",
    };
    let isValid = true;

    if (!formData.employeeName.trim()) {
      newErrors.employeeName = "Employee Name is required";
      isValid = false;
    }

    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
      isValid = false;
    } else if (isNaN(formData.employeeId) || formData.employeeId <= 0) {
      newErrors.employeeId = "Employee ID must be a positive number";
      isValid = false;
    }

    if (!formData.payPeriod) {
      newErrors.payPeriod = "Pay Period is required";
      isValid = false;
    } else if (!/^\d{4}-\d{2}$/.test(formData.payPeriod)) {
      newErrors.payPeriod = "Invalid pay period format (YYYY-MM)";
      isValid = false;
    }

    if (!formData.grossPay) {
      newErrors.grossPay = "Gross Pay is required";
      isValid = false;
    } else if (isNaN(formData.grossPay) || formData.grossPay < 0) {
      newErrors.grossPay = "Gross Pay must be a non-negative number";
      isValid = false;
    }

    if (!formData.deductions && formData.deductions !== 0) {
      newErrors.deductions = "Deductions is required";
      isValid = false;
    } else if (isNaN(formData.deductions) || formData.deductions < 0) {
      newErrors.deductions = "Deductions must be a non-negative number";
      isValid = false;
    }

    if (!formData.netPay && formData.netPay !== 0) {
      newErrors.netPay = "Net Pay is required";
      isValid = false;
    } else if (isNaN(formData.netPay) || formData.netPay < 0) {
      newErrors.netPay = "Net Pay must be a non-negative number";
      isValid = false;
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
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
    if (["employeeId", "grossPay", "deductions", "netPay"].includes(name as string)) {
      setFormData((prev) => ({ ...prev, [name as string]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name as string]: value as string }));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        id: payroll ? payroll.id : Date.now(),
        ...formData,
      });
      onClose();
    }
  };

  // Status options
  const statuses = ["Processed", "Pending", "Failed"];

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
          {payroll ? "Edit Payroll" : "Add Payroll"}
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
                label="Employee Name"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                error={!!errors.employeeName}
                helperText={errors.employeeName}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Employee ID"
                name="employeeId"
                type="number"
                value={formData.employeeId}
                onChange={handleChange}
                error={!!errors.employeeId}
                helperText={errors.employeeId}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Pay Period (YYYY-MM)"
                name="payPeriod"
                value={formData.payPeriod}
                onChange={handleChange}
                error={!!errors.payPeriod}
                helperText={errors.payPeriod}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Gross Pay ($)"
                name="grossPay"
                type="number"
                value={formData.grossPay}
                onChange={handleChange}
                error={!!errors.grossPay}
                helperText={errors.grossPay}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Deductions ($)"
                name="deductions"
                type="number"
                value={formData.deductions}
                onChange={handleChange}
                error={!!errors.deductions}
                helperText={errors.deductions}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  sx: { background: theme.palette.background.paper },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                fullWidth
                label="Net Pay ($)"
                name="netPay"
                type="number"
                value={formData.netPay}
                onChange={handleChange}
                error={!!errors.netPay}
                helperText={errors.netPay}
                size={isMobile ? "small" : "medium"}
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
          {payroll ? "Update" : "Add"}
        </SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddEditPayrollDetails;