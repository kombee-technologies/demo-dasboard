import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  styled,
  alpha,
  useTheme,
  useMediaQuery,
  Tooltip,
  Fade,
  Slide,
  Zoom,
} from "@mui/material";
import {
  AccessTime as ClockIcon,
  CheckCircle,
  TimerOff,
  Close as CloseIcon,
} from "@mui/icons-material";

// Styled Components
const ModalBackdrop = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.zIndex.modal,
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  maxWidth: 450,
  background: theme.palette.background.paper,
  borderRadius: 2,
  boxShadow: theme.shadows[10],
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  position: "relative", // Added for positioning the close button
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    maxWidth: "calc(100% - 32px)",
    padding: theme.spacing(3),
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[700],
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
  },
}));

const TimerDisplay = styled(Box)(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  textAlign: "center",
  color: theme.palette.text.primary,
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  padding: theme.spacing(3),
  borderRadius: 2,
  boxShadow: theme.shadows[1],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    padding: theme.spacing(2),
  },
}));

const StatusContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  background: alpha(theme.palette.grey[100], 0.5),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

const StatusTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  "& svg": {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75),
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: 2,
  textTransform: "none",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.25),
    fontSize: "0.9rem",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1.5),
  },
}));

const ClockIconButton = styled(IconButton)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  padding: theme.spacing(1),
  margin: theme.spacing(1.5),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "rotate(15deg) scale(1.1)",
    background: alpha(theme.palette.primary.main, 0.2),
    boxShadow: theme.shadows[2],
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

interface CheckInCheckOutModalProps {
  onCheckIn: (startTime: string) => void;
  onCheckOut: (startTime: string, endTime: string, totalTime: string) => void;
}

const CheckInCheckOutModal: React.FC<CheckInCheckOutModalProps> = ({
  onCheckIn,
  onCheckOut,
}) => {
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [totalTime, setTotalTime] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTotalTime = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
  };

  const handleCheckIn = () => {
    const now = new Date().toLocaleString();
    setStartTime(now);
    setEndTime(null);
    setTotalTime(null);
    onCheckIn(now);
    handleClose();
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleString();
    setEndTime(now);
    if (startTime) {
      const total = calculateTotalTime(startTime, now);
      setTotalTime(total);
      onCheckOut(startTime, now, total);
    }
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Check In/Out">
        <Zoom in={true} style={{ transitionDelay: "100ms" }}>
          <ClockIconButton
            onClick={handleOpen}
            color="primary"
            size={isMobile ? "medium" : "large"}
          >
            <ClockIcon fontSize={isMobile ? "medium" : "small"} />
          </ClockIconButton>
        </Zoom>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="check-in-out-modal"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalBackdrop>
            <Slide in={open} direction="up" timeout={300}>
              <ModalContainer>
                {/* Close button added here */}
                <CloseButton
                  aria-label="close"
                  onClick={handleClose}
                  size={isMobile ? "small" : "medium"}
                >
                  <CloseIcon />
                </CloseButton>

                <Typography
                  id="check-in-out-modal"
                  variant={isMobile ? "h6" : "h5"}
                  align="center"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1,
                    pr: 4, // Add padding to prevent text overlap with close button
                  }}
                >
                  Attendance Tracker
                </Typography>

                <TimerDisplay>{currentTime}</TimerDisplay>

                {(startTime || endTime || totalTime) && (
                  <StatusContainer>
                    {startTime && (
                      <StatusTypography>
                        <CheckCircle color="primary" fontSize="small" />
                        Start Time: {startTime}
                      </StatusTypography>
                    )}
                    {endTime && (
                      <StatusTypography>
                        <TimerOff color="secondary" fontSize="small" />
                        End Time: {endTime}
                      </StatusTypography>
                    )}
                    {totalTime && (
                      <StatusTypography>
                        <ClockIcon color="action" fontSize="small" />
                        Total Time: {totalTime}
                      </StatusTypography>
                    )}
                  </StatusContainer>
                )}

                <ButtonContainer>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    onClick={handleCheckIn}
                    fullWidth
                    disabled={!!startTime && !endTime}
                    startIcon={<CheckCircle />}
                    size={isMobile ? "medium" : "large"}
                  >
                    Check In
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    color="secondary"
                    onClick={handleCheckOut}
                    fullWidth
                    disabled={!startTime || !!endTime}
                    startIcon={<TimerOff />}
                    size={isMobile ? "medium" : "large"}
                  >
                    Check Out
                  </ActionButton>
                </ButtonContainer>
              </ModalContainer>
            </Slide>
          </ModalBackdrop>
        </Fade>
      </Modal>
    </>
  );
};

export default CheckInCheckOutModal;
