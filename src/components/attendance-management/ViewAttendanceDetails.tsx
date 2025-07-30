import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Person,
  Event,
  AccessTime,
  Timelapse,
  Assignment,
} from "@mui/icons-material";

// Interface for attendance data (matching AttendanceTable)
interface Attendance {
  id: number;
  employeeName: string;
  employeeId: number;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  hoursWorked: string;
}

// Styled Backdrop with blur effect
const BlurBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(3px)",
  WebkitBackdropFilter: "blur(5px)",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 2,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    maxWidth: "680px",
    width: "100%",
    margin: theme.spacing(2),
    overflow: "hidden",
  },
  "&.MuiDialog-root": {
    animation: "$fadeIn 0.3s ease-out",
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.mode !== "light" ? "#f0cdee" : "#770aa5",
  color: theme.palette.primary.contrastText,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3),
  "& .MuiTypography-root": {
    fontWeight: 600,
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(0),
  background: theme.palette.background.default,
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4, 2),
  background: theme.palette.mode === "light" ? "#c5a9c4ff" : "#770aa5",
  color: theme.palette.primary.contrastText,
  position: "relative",
}));

const EmployeeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: 2,
  margin: theme.spacing(-2, 2, 2, 2),
  boxShadow: theme.shadows[2],
  position: "relative",
  zIndex: 1,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease",
  "&:hover": {
    background: theme.palette.action.hover,
    transform: "translateX(4px)",
  },
  "&:not(:last-child)": {
    marginBottom: theme.spacing(1),
  },
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.mode === "light" ? "#f0cdee" : "#770aa5",
  color: theme.palette.mode !== "light" ? "#f0cdee" : "#770aa5",
  borderRadius: "50%",
  width: theme.spacing(4),
  height: theme.spacing(4),
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 2,
  background: `linear-gradient(45deg, #bf08fb 30%, #9c06c9 90%)`,
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  letterSpacing: "0.5px",
  boxShadow: "none",
  "&:hover": {
    background: `linear-gradient(45deg, #9c06c9 30%, #bf08fb 90%)`,
    boxShadow: theme.shadows[4],
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}));

interface ViewAttendanceDetailsProps {
  open: boolean;
  onClose: () => void;
  attendance: Attendance | undefined;
}

const ViewAttendanceDetails: React.FC<ViewAttendanceDetailsProps> = ({
  open,
  onClose,
  attendance,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return "success";
      case "absent":
        return "error";
      case "late":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      {open && <BlurBackdrop open={open} onClick={onClose} />}
      <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="view-attendance-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle id="view-attendance-dialog-title">
          <Typography variant={isMobile ? "h6" : "h5"}>
            Attendance Details
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              minWidth: "auto",
              padding: 0.5,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <CloseIcon />
          </Button>
        </StyledDialogTitle>

        <StyledDialogContent>
          {attendance ? (
            <>
              <ProfileHeader>
                <EmployeeAvatar
                  alt={attendance.employeeName}
                  src="/static/images/avatar/1.jpg"
                />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {attendance.employeeName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Attendance Record
                </Typography>
                <StatusChip
                  label={attendance.status}
                  color={getStatusColor(attendance.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </ProfileHeader>

              <InfoContainer>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <Person fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Employee Name
                        </Typography>
                        <Typography variant="body1">
                          {attendance.employeeName}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <Person fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Employee ID
                        </Typography>
                        <Typography variant="body1">
                          {attendance.employeeId}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <Event fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Date
                        </Typography>
                        <Typography variant="body1">
                          {attendance.date}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <AccessTime fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Check In
                        </Typography>
                        <Typography variant="body1">
                          {attendance.checkIn || "-"}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <AccessTime fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Check Out
                        </Typography>
                        <Typography variant="body1">
                          {attendance.checkOut || "-"}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <Timelapse fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Hours Worked
                        </Typography>
                        <Typography variant="body1">
                          {attendance.hoursWorked}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InfoItem>
                      <InfoIcon>
                        <Assignment fontSize="small" />
                      </InfoIcon>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Status
                        </Typography>
                        <Typography variant="body1">
                          {attendance.status}
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Grid>
                </Grid>
              </InfoContainer>
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <Typography variant="body1" color="textSecondary">
                No attendance data available
              </Typography>
            </Box>
          )}
        </StyledDialogContent>

        <DialogActions
          sx={{
            padding: theme.spacing(2, 3),
            background: theme.palette.background.default,
          }}
        >
          <ActionButton
            onClick={onClose}
            variant="contained"
            color="primary"
            fullWidth={isMobile}
          >
            Close
          </ActionButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default ViewAttendanceDetails;
