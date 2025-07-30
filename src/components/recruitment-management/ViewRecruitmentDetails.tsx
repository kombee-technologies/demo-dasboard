import React from "react";
import {
  Dialog,
  DialogTitle,
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
import { Person, Work, Event, Assignment } from "@mui/icons-material";

interface Recruitment {
  id: number;
  candidateName: string;
  candidateId: number;
  position: string;
  applicationDate: string;
  status: string;
  interviewer: string;
  avatar?: string;
}

const BlurBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(3px)",
  WebkitBackdropFilter: "blur(3px)",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    maxWidth: "680px",
    width: "100%",
    margin: theme.spacing(1),
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
  background: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  color: theme.palette.primary.contrastText,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  "& .MuiTypography-root": {
    fontWeight: 600,
  },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4, 2),
  background: theme.palette.mode === "dark" ? "#3a0b52" : "#c5a9c4",
  color: theme.palette.getContrastText(
    theme.palette.mode === "dark" ? "#3a0b52" : "#c5a9c4"
  ),
  position: "relative",
}));

const EmployeeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderRadius: "8px",
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
  background: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  width: theme.spacing(4),
  height: theme.spacing(4),
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: string }>(({ theme, status }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: theme.spacing(0.5, 1),
  borderRadius: "8px",
  ...(status.toLowerCase() === "hired" && {
    backgroundColor: theme.palette.mode === "dark" ? "#4caf50" : "#e8f5e9",
    color: theme.palette.mode === "dark" ? "#e8f5e9" : "#2e7d32",
  }),
  ...(status.toLowerCase() === "in review" && {
    backgroundColor: theme.palette.mode === "dark" ? "#ff9800" : "#fff3e0",
    color: theme.palette.mode === "dark" ? "#fff3e0" : "#e65100",
  }),
  ...(status.toLowerCase() === "rejected" && {
    backgroundColor: theme.palette.mode === "dark" ? "#f44336" : "#ffebee",
    color: theme.palette.mode === "dark" ? "#ffebee" : "#c62828",
  }),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  background: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  letterSpacing: "0.5px",
  boxShadow: "none",
  "&:hover": {
    background: theme.palette.mode === "dark" ? "#e0b0d4" : "#66008f",
    boxShadow: theme.shadows[4],
  },
  transition: "all 0.3s ease",
}));

interface ViewRecruitmentDetailsProps {
  open: boolean;
  onClose: () => void;
  recruitment: Recruitment | undefined;
}

const ViewRecruitmentDetails: React.FC<ViewRecruitmentDetailsProps> = ({
  open,
  onClose,
  recruitment,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {open && <BlurBackdrop open={open} onClick={onClose} />}
      <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="view-recruitment-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <StyledDialogTitle id="view-recruitment-dialog-title">
          <Typography variant={isMobile ? "h6" : "h5"}>
            Recruitment Details
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

        {recruitment ? (
          <>
            <ProfileHeader>
              <EmployeeAvatar
                alt={recruitment.candidateName}
                src={recruitment.avatar || "/static/images/avatar/1.jpg"}
              >
                {!recruitment.avatar && <Person fontSize="large" />}
              </EmployeeAvatar>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {recruitment.candidateName}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Recruitment Record
              </Typography>
              <StatusChip
                label={recruitment.status}
                status={recruitment.status}
                size="small"
                sx={{ mt: 1 }}
              />
            </ProfileHeader>

            <InfoContainer>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                  <InfoItem>
                    <InfoIcon>
                      <Person fontSize="small" />
                    </InfoIcon>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Candidate Name
                      </Typography>
                      <Typography variant="body1">
                        {recruitment.candidateName}
                      </Typography>
                    </Box>
                  </InfoItem>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                  <InfoItem>
                    <InfoIcon>
                      <Person fontSize="small" />
                    </InfoIcon>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Candidate ID
                      </Typography>
                      <Typography variant="body1">
                        {recruitment.candidateId}
                      </Typography>
                    </Box>
                  </InfoItem>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                  <InfoItem>
                    <InfoIcon>
                      <Work fontSize="small" />
                    </InfoIcon>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Position
                      </Typography>
                      <Typography variant="body1">
                        {recruitment.position}
                      </Typography>
                    </Box>
                  </InfoItem>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                  <InfoItem>
                    <InfoIcon>
                      <Event fontSize="small" />
                    </InfoIcon>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Application Date
                      </Typography>
                      <Typography variant="body1">
                        {recruitment.applicationDate}
                      </Typography>
                    </Box>
                  </InfoItem>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                  <InfoItem>
                    <InfoIcon>
                      <Person fontSize="small" />
                    </InfoIcon>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Interviewer
                      </Typography>
                      <Typography variant="body1">
                        {recruitment.interviewer}
                      </Typography>
                    </Box>
                  </InfoItem>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                  <InfoItem>
                    <InfoIcon>
                      <Assignment fontSize="small" />
                    </InfoIcon>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Status
                      </Typography>
                      <Typography variant="body1">
                        <StatusChip
                          label={recruitment.status}
                          status={recruitment.status}
                          size="small"
                        />
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
              No recruitment data available
            </Typography>
          </Box>
        )}

        <DialogActions
          sx={{
            padding: theme.spacing(2, 3),
            background: theme.palette.background.default,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ActionButton
            onClick={onClose}
            variant="contained"
            fullWidth={isMobile}
          >
            Close
          </ActionButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default ViewRecruitmentDetails;
