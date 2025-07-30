import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Tooltip,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditPayrollDetails from "./AddEditPayrollDetails";
import ViewPayrollDetails from "./ViewPayrollDetails"; // Add this import

// Interface for payroll data
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
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

interface StatusChipProps {
  status: string;
}

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})<StatusChipProps>(({ theme, status }) => ({
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  transition: "all 0.3s ease",
  ...(status === "Processed" && {
    background: `linear-gradient(45deg, ${theme.palette.success.light} 30%, ${theme.palette.success.main} 90%)`,
    color: theme.palette.success.contrastText,
  }),
  ...(status === "Pending" && {
    background: `linear-gradient(45deg, ${theme.palette.warning.light} 30%, ${theme.palette.warning.main} 90%)`,
    color: theme.palette.warning.contrastText,
  }),
  ...(status === "Failed" && {
    background: `linear-gradient(45deg, ${theme.palette.error.light} 30%, ${theme.palette.error.main} 90%)`,
    color: theme.palette.error.contrastText,
  }),
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[2],
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[100],
  "&:hover": {
    background: theme.palette.grey[200],
    transform: "scale(1.1)",
  },
  transition: "all 0.2s ease",
}));

// Sample payroll data
const payrollList: Payroll[] = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeId: 1,
    payPeriod: "2025-07",
    grossPay: 5000,
    deductions: 1200,
    netPay: 3800,
    status: "Processed",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    employeeId: 2,
    payPeriod: "2025-07",
    grossPay: 4500,
    deductions: 1000,
    netPay: 3500,
    status: "Pending",
  },
  {
    id: 3,
    employeeName: "Robert Johnson",
    employeeId: 3,
    payPeriod: "2025-07",
    grossPay: 4800,
    deductions: 1100,
    netPay: 3700,
    status: "Processed",
  },
  {
    id: 4,
    employeeName: "Emily Davis",
    employeeId: 4,
    payPeriod: "2025-07",
    grossPay: 5200,
    deductions: 1300,
    netPay: 3900,
    status: "Processed",
  },
  {
    id: 5,
    employeeName: "Michael Wilson",
    employeeId: 5,
    payPeriod: "2025-07",
    grossPay: 4700,
    deductions: 1050,
    netPay: 3650,
    status: "Failed",
  },
];

const PayrollTable: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [payroll, setPayroll] = useState<Payroll[]>(payrollList);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false); // New state for view modal
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | undefined>(
    undefined
  );

  const columns: GridColDef<Payroll>[] = [
    {
      field: "employeeName",
      headerName: "Employee",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {params.row.employeeName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {params.row.employeeId}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "payPeriod",
      headerName: "Pay Period",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "grossPay",
      headerName: "Gross Pay",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          ${params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "deductions",
      headerName: "Deductions",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          ${params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "netPay",
      headerName: "Net Pay",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary" fontWeight={500}>
          ${params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StatusChip label={params.value} status={params.value} size="small" />
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Tooltip title="View details">
            <StyledIconButton
              size="small"
              onClick={() => {
                setSelectedPayroll(params.row);
                setOpenViewDialog(true);
              }}
            >
              <VisibilityIcon fontSize="small" color="primary" />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Edit payroll">
            <StyledIconButton
              size="small"
              onClick={() => {
                setSelectedPayroll(params.row);
                setOpenDialog(true);
              }}
            >
              <EditIcon fontSize="small" color="secondary" />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Delete payroll">
            <StyledIconButton
              size="small"
              onClick={() => console.log(`Delete ${params.row.id}`)}
            >
              <DeleteIcon fontSize="small" color="error" />
            </StyledIconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleAddPayroll = () => {
    setSelectedPayroll(undefined);
    setOpenDialog(true);
  };

  const handleSubmit = (payrollRecord: Payroll) => {
    if (payrollRecord.id) {
      setPayroll((prev) =>
        prev.map((rec) => (rec.id === payrollRecord.id ? payrollRecord : rec))
      );
    } else {
      setPayroll((prev) => [...prev, { ...payrollRecord, id: Date.now() }]);
    }
  };

  return (
    <StyledBox>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        sx={{ mb: 4, gap: isMobile ? 2 : 0 }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          color="text.primary"
        >
          Payroll Management
        </Typography>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPayroll}
          fullWidth={isMobile}
        >
          Add Payroll
        </StyledButton>
      </Stack>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <DataGrid
          rows={payroll}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            border: "none",
            background: theme.palette.background.paper,
            "& .MuiDataGrid-columnHeaders": {
              background: `linear-gradient(180deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
              borderBottom: `2px solid ${theme.palette.divider}`,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: isMobile ? "0.9rem" : "1rem",
              },
            },
            "& .MuiDataGrid-cell": {
              padding: theme.spacing(2),
              borderBottom: `1px solid ${theme.palette.grey[100]}`,
              color: theme.palette.text.primary,
            },
            "& .MuiDataGrid-row": {
              transition: "all 0.3s ease",
              "&:hover": {
                background: theme.palette.action.hover,
                transform: "translateY(-1px)",
                boxShadow: theme.shadows[3],
              },
            },
            "& .MuiDataGrid-footerContainer": {
              background: `linear-gradient(180deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
              borderTop: `2px solid ${theme.palette.divider}`,
              "& .MuiDataGrid-pagination": {
                color: theme.palette.text.secondary,
                fontSize: isMobile ? "0.85rem" : "0.9rem",
              },
            },
            "& .MuiDataGrid-toolbarContainer": {
              padding: theme.spacing(2),
            },
            [theme.breakpoints.down("sm")]: {
              "& .MuiDataGrid-cell": {
                fontSize: "0.85rem",
              },
            },
          }}
        />
      </Box>
      <AddEditPayrollDetails
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        payroll={selectedPayroll}
        onSubmit={handleSubmit}
      />
      <ViewPayrollDetails
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        payroll={selectedPayroll}
      />
    </StyledBox>
  );
};

export default PayrollTable;
