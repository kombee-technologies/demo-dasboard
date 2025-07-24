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
import AddEditEmployeeDetails from "./AddEditEmployeeDetails";

// Interface for employee data
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
  ...(status === "Active" && {
    background: `linear-gradient(45deg, ${theme.palette.success.light} 30%, ${theme.palette.success.main} 90%)`,
    color: theme.palette.success.contrastText,
  }),
  ...(status === "On Leave" && {
    background: `linear-gradient(45deg, ${theme.palette.warning.light} 30%, ${theme.palette.warning.main} 90%)`,
    color: theme.palette.warning.contrastText,
  }),
  ...(status === "Terminated" && {
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

// Employee data
const employeesList: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Software Engineer",
    department: "Engineering",
    joinDate: "2020-05-15",
    salary: "$85,000",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    position: "Product Manager",
    department: "Product",
    joinDate: "2019-08-22",
    salary: "$95,000",
    status: "Active",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    position: "UX Designer",
    department: "Design",
    joinDate: "2021-01-10",
    salary: "$75,000",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    position: "HR Specialist",
    department: "Human Resources",
    joinDate: "2018-11-05",
    salary: "$65,000",
    status: "Active",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.w@example.com",
    position: "DevOps Engineer",
    department: "Engineering",
    joinDate: "2020-03-18",
    salary: "$90,000",
    status: "Active",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    position: "Marketing Lead",
    department: "Marketing",
    joinDate: "2019-06-30",
    salary: "$80,000",
    status: "Terminated",
  },
  {
    id: 7,
    name: "David Lee",
    email: "david.lee@example.com",
    position: "Data Analyst",
    department: "Analytics",
    joinDate: "2021-07-12",
    salary: "$70,000",
    status: "Active",
  },
  {
    id: 8,
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    position: "QA Engineer",
    department: "Engineering",
    joinDate: "2020-09-25",
    salary: "$78,000",
    status: "Active",
  },
  {
    id: 9,
    name: "Daniel Martinez",
    email: "daniel.m@example.com",
    position: "Sales Executive",
    department: "Sales",
    joinDate: "2021-02-14",
    salary: "$72,000",
    status: "On Leave",
  },
  {
    id: 10,
    name: "Olivia Anderson",
    email: "olivia.a@example.com",
    position: "Finance Manager",
    department: "Finance",
    joinDate: "2018-04-08",
    salary: "$110,000",
    status: "Active",
  },
  {
    id: 11,
    name: "William Thomas",
    email: "william.t@example.com",
    position: "Frontend Developer",
    department: "Engineering",
    joinDate: "2021-05-20",
    salary: "$82,000",
    status: "Active",
  },
  {
    id: 12,
    name: "Sophia White",
    email: "sophia.w@example.com",
    position: "Content Writer",
    department: "Marketing",
    joinDate: "2020-10-15",
    salary: "$60,000",
    status: "Active",
  },
  {
    id: 13,
    name: "James Harris",
    email: "james.h@example.com",
    position: "Backend Developer",
    department: "Engineering",
    joinDate: "2019-12-03",
    salary: "$88,000",
    status: "Terminated",
  },
];

const EmployeeTable: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [employees, setEmployees] = useState<Employee[]>(employeesList);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  const columns: GridColDef<Employee>[] = [
    {
      field: "name",
      headerName: "Employee",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {params.row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary" fontWeight={500}>
          {params.value}
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
              onClick={() => console.log(`View ${params.row.id}`)}
            >
              <VisibilityIcon fontSize="small" color="primary" />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Edit employee">
            <StyledIconButton
              size="small"
              onClick={() => {
                setSelectedEmployee(params.row);
                setOpenDialog(true);
              }}
            >
              <EditIcon fontSize="small" color="secondary" />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Delete employee">
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

  const handleAddEmployee = () => {
    setSelectedEmployee(undefined);
    setOpenDialog(true);
  };

  const handleSubmit = (employee: Employee) => {
    if (employee.id) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } else {
      setEmployees((prev) => [...prev, { ...employee, id: Date.now() }]);
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
          Employee Management
        </Typography>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          fullWidth={isMobile}
        >
          Add Employee
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
          rows={employees}
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
              padding: theme.spacing(3),
            },
            [theme.breakpoints.down("sm")]: {
              "& .MuiDataGrid-cell": {
                fontSize: "0.85rem",
              },
            },
          }}
        />
      </Box>
      <AddEditEmployeeDetails
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        employee={selectedEmployee}
        onSubmit={handleSubmit}
      />
    </StyledBox>
  );
};

export default EmployeeTable;
