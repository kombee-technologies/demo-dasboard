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
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

interface StatusChipProps {
  status: string;
}

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})<StatusChipProps>(({ theme, status }) => ({
  fontWeight: 500,
  ...(status === "Active" && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  ...(status === "On Leave" && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  }),
  ...(status === "Terminated" && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  boxShadow: theme.shadows[2],
  backgroundColor: "#bf08fb",
  "&:hover": {
    backgroundColor: "#9c06c9", // Darker shade of #bf08fb
    boxShadow: theme.shadows[4],
    transform: "translateY(-1px)",
  },
  transition: "all 0.2s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
    padding: theme.spacing(0.5, 1),
  },
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
        <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
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
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <StatusChip label={params.value} status={params.value} size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View details">
            <IconButton
              size="small"
              onClick={() => console.log(`View ${params.row.id}`)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit employee">
            <IconButton
              size="small"
              onClick={() => {
                setSelectedEmployee(params.row);
                setOpenDialog(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete employee">
            <IconButton
              size="small"
              color="error"
              onClick={() => console.log(`Delete ${params.row.id}`)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
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
        justifyContent="flex-end"
        alignItems={isMobile ? "flex-start" : "center"}
        sx={{ mb: 3, gap: isMobile ? 2 : 0 }}
      >
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          fullWidth={isMobile}
        >
          Add Employee
        </StyledButton>
      </Stack>
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={employees}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            borderRadius: theme.shape.borderRadius,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[800],
            },
            "& .MuiDataGrid-cell": {
              padding: theme.spacing(1),
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor:
                theme.palette.action?.hover || "rgba(0, 0, 0, 0.04)",
            },
            [theme.breakpoints.down("sm")]: {
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "0.9rem",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.8rem",
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
