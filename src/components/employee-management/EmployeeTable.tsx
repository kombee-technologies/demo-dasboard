import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Tooltip,
  IconButton,
  Avatar,
  Chip,
  styled,
  useTheme,
  Box,
  Typography,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ArrowUpward as AscIcon,
  ArrowDownward as DescIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

// Styled Components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  "& .MuiTable-root": {
    minWidth: 650,
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiTable-root": {
      minWidth: "100%",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  "&.MuiTableCell-head": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
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

// Dummy employee data
interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  salary: string;
  status: string;
  avatar: string;
}

const dummyEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Software Engineer",
    department: "Engineering",
    joinDate: "2020-05-15",
    salary: "$85,000",
    status: "Active",
    avatar: "/static/images/avatar/1.jpg",
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
    avatar: "/static/images/avatar/2.jpg",
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
    avatar: "/static/images/avatar/3.jpg",
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
    avatar: "/static/images/avatar/4.jpg",
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
    avatar: "/static/images/avatar/5.jpg",
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
    avatar: "/static/images/avatar/6.jpg",
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
    avatar: "/static/images/avatar/7.jpg",
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
    avatar: "/static/images/avatar/8.jpg",
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
    avatar: "/static/images/avatar/9.jpg",
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
    avatar: "/static/images/avatar/10.jpg",
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
    avatar: "/static/images/avatar/11.jpg",
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
    avatar: "/static/images/avatar/12.jpg",
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
    avatar: "/static/images/avatar/1.jpg",
  },
];

// Table columns configuration
const columns = [
  { id: "name", label: "Employee", sortable: true },
  { id: "position", label: "Position", sortable: true },
  { id: "department", label: "Department", sortable: true },
  { id: "joinDate", label: "Join Date", sortable: true },
  { id: "salary", label: "Salary", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "actions", label: "Actions", sortable: false },
];

const EmployeeTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Employee>("name");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property as keyof Employee);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = React.useMemo(() => {
    return [...dummyEmployees].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return order === "asc"
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      }
    });
  }, [order, orderBy]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - dummyEmployees.length)
      : 0;

  const handleAddEmployee = () => {
    // Logic to open add employee modal/dialog
    console.log("Add new employee clicked");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Employee Management
        </Typography>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Filter employees">
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{
                textTransform: "none",
                display: isMobile ? "none" : "inline-flex",
              }}
            >
              Filters
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddEmployee}
            sx={{
              textTransform: "none",
              boxShadow: theme.shadows[2],
              "&:hover": {
                boxShadow: theme.shadows[4],
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Add Employee
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ mb: 2 }}>
        <StyledTableContainer>
          <Table aria-label="employee table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                        IconComponent={order === "asc" ? AscIcon : DescIcon}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={employee.avatar}
                          alt={employee.name}
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {employee.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {employee.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={employee.status}
                        status={employee.status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="View details">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit employee">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete employee">
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dummyEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-toolbar": {
            paddingLeft: isMobile ? 0 : undefined,
          },
        }}
      />
    </Box>
  );
};

export default EmployeeTable;