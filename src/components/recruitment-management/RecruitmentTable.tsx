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
import AddEditRecruitmentDetails from "./AddEditRecruitmentDetails";
import ViewRecruitmentDetails from "./ViewRecruitmentDetails";

// Interface for recruitment data
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
  ...(status === "Hired" && {
    background: `linear-gradient(45deg, ${theme.palette.success.light} 30%, ${theme.palette.success.main} 90%)`,
    color: theme.palette.success.contrastText,
  }),
  ...(status === "In Review" && {
    background: `linear-gradient(45deg, ${theme.palette.warning.light} 30%, ${theme.palette.warning.main} 90%)`,
    color: theme.palette.warning.contrastText,
  }),
  ...(status === "Rejected" && {
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

// Sample recruitment data
const recruitmentList: Recruitment[] = [
  {
    id: 1,
    candidateName: "Alice Brown",
    candidateId: 101,
    position: "Software Engineer",
    applicationDate: "2025-07-15",
    status: "Hired",
    interviewer: "John Smith",
  },
  {
    id: 2,
    candidateName: "Bob Wilson",
    candidateId: 102,
    position: "Product Manager",
    applicationDate: "2025-07-16",
    status: "In Review",
    interviewer: "Emma Davis",
  },
  {
    id: 3,
    candidateName: "Clara Johnson",
    candidateId: 103,
    position: "UI/UX Designer",
    applicationDate: "2025-07-17",
    status: "Rejected",
    interviewer: "Michael Lee",
  },
  {
    id: 4,
    candidateName: "David Miller",
    candidateId: 104,
    position: "Data Analyst",
    applicationDate: "2025-07-18",
    status: "In Review",
    interviewer: "Sarah Taylor",
  },
  {
    id: 5,
    candidateName: "Emma White",
    candidateId: 105,
    position: "DevOps Engineer",
    applicationDate: "2025-07-19",
    status: "Hired",
    interviewer: "James Brown",
  },
];

// Scrollable container for the DataGrid
const ScrollableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
  overflowY: "hidden",
  "-webkit-overflow-scrolling": "touch",
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,
  "&::-webkit-scrollbar": {
    height: "10px",
    display: "block",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[500],
    borderRadius: "5px",
    border: `2px solid ${theme.palette.grey[100]}`,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[100],
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    "-ms-overflow-style": "scrollbar",
    "&::-webkit-scrollbar": {
      height: "12px",
    },
  },
  [theme.breakpoints.up("md")]: {
    overflowX: "auto",
  },
}));

const RecruitmentTable: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [recruitment, setRecruitment] = useState<Recruitment[]>(
    recruitmentList
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] = useState<
    Recruitment | undefined
  >(undefined);

  const columns: GridColDef<Recruitment>[] = [
    {
      field: "candidateName",
      headerName: "Candidate",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {params.row.candidateName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.candidateId}
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
      field: "applicationDate",
      headerName: "Application Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "interviewer",
      headerName: "Interviewer",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" color="text.primary">
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
              onClick={() => {
                setSelectedRecruitment(params.row);
                setOpenViewDialog(true);
              }}
            >
              <VisibilityIcon fontSize="small" color="primary" />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Edit recruitment">
            <StyledIconButton
              size="small"
              onClick={() => {
                setSelectedRecruitment(params.row);
                setOpenDialog(true);
              }}
            >
              <EditIcon fontSize="small" color="secondary" />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Delete recruitment">
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

  const handleAddRecruitment = () => {
    setSelectedRecruitment(undefined);
    setOpenDialog(true);
  };

  const handleSubmit = (recruitmentRecord: Recruitment) => {
    if (recruitmentRecord.id) {
      setRecruitment((prev) =>
        prev.map((rec) =>
          rec.id === recruitmentRecord.id ? recruitmentRecord : rec
        )
      );
    } else {
      setRecruitment((prev) => [
        ...prev,
        { ...recruitmentRecord, id: Date.now() },
      ]);
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
          Recruitment Management
        </Typography>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRecruitment}
          fullWidth={isMobile}
        >
          Add Recruitment
        </StyledButton>
      </Stack>
      <ScrollableContainer>
        <DataGrid
          rows={recruitment}
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
      </ScrollableContainer>

      <AddEditRecruitmentDetails
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        recruitment={selectedRecruitment}
        onSubmit={handleSubmit}
      />
      <ViewRecruitmentDetails
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        recruitment={selectedRecruitment}
      />
    </StyledBox>
  );
};

export default RecruitmentTable;
