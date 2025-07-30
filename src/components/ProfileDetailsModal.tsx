import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  IconButton,
  Chip,
  Grid,
  useTheme,
  InputAdornment,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Close,
  Person,
  Email,
  Phone,
  LocationOn,
  Cake,
  Transgender,
  Work,
  School,
  Edit,
  CloudUpload,
} from "@mui/icons-material";

interface ProfileData {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  jobTitle: string;
  department: string;
  education: string;
  skills: string[];
  bio: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    width: "100%",
    maxWidth: "800px",
    overflow: "hidden",
    backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      borderRadius: 2,
    },
  },
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  background: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: "130px",
  height: "130px",
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[6],
  margin: "-60px auto 20px",
  backgroundColor: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  [theme.breakpoints.down("sm")]: {
    width: "80px",
    height: "80px",
    margin: "-40px auto 15px",
  },
}));

const EditAvatarButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: "8px",
  border: `1px solid ${theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5"}`,
  color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  "& .MuiChip-deleteIcon": {
    color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  background: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  color: "#ffffff",
  "&:hover": {
    background: theme.palette.mode === "dark" ? "#e0b0d4" : "#66008f",
  },
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 2),
    fontSize: "0.875rem",
  },
}));

const OutlinedActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  border: `1px solid ${theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5"}`,
  color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(240, 205, 238, 0.08)"
        : "rgba(119, 10, 165, 0.08)",
    borderWidth: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 2),
    fontSize: "0.875rem",
  },
}));

const ProfileDetailsModal = ({
  open,
  onClose,
  profileData,
}: {
  open: boolean;
  onClose: () => void;
  profileData?: ProfileData;
}) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(
    profileData || {
      id: "",
      avatar: "",
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      jobTitle: "",
      department: "",
      education: "",
      skills: [],
      bio: "",
    }
  );
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = () => {
    console.log("Profile saved:", profile);
    setEditMode(false);
    onClose();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile((prev) => ({
            ...prev,
            avatar: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogHeader>
        <Typography variant="h6" component="div">
          {editMode ? "Edit Profile" : "Profile Details"}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#ffffff" }}>
          <Close />
        </IconButton>
      </DialogHeader>

      <DialogContent dividers>
        <Box sx={{ position: "relative", textAlign: "center", mb: 4, mt: 10 }}>
          <ProfileAvatar
            src={profile.avatar || "/default-avatar.png"}
            alt={profile.fullName}
          >
            {!profile.avatar && <Person sx={{ fontSize: "60px" }} />}
          </ProfileAvatar>
          {editMode && (
            <>
              <EditAvatarButton>
                <Edit fontSize="small" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </EditAvatarButton>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Click to upload new photo
              </Typography>
            </>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Personal Information Section */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <SectionTitle variant="h6">
              <Person
                sx={{
                  color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
                }}
              />
              Personal Information
            </SectionTitle>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <StyledTextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <StyledTextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Transgender color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editMode}
                  multiline
                  rows={2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          {/* Professional Information Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle variant="h6">
              <Work
                sx={{
                  color: theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
                }}
              />
              Professional Information
            </SectionTitle>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StyledTextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <StyledTextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", mb: 1 }}>
                  {profile.skills.map((skill) => (
                    <SkillChip
                      key={skill}
                      label={skill}
                      onDelete={
                        editMode ? () => handleRemoveSkill(skill) : undefined
                      }
                    />
                  ))}
                </Box>
                {editMode && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <StyledTextField
                      fullWidth
                      size="small"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add new skill"
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddSkill}
                      disabled={!newSkill.trim()}
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#f0cdee" : "#770aa5",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "#e0b0d4"
                              : "#66008f",
                        },
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                )}
              </Grid>

              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!editMode}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ padding: theme.spacing(3), justifyContent: "space-between" }}
      >
        {editMode ? (
          <>
            <OutlinedActionButton onClick={() => setEditMode(false)}>
              Cancel
            </OutlinedActionButton>
            <ActionButton onClick={handleSubmit} startIcon={<CloudUpload />}>
              Save Changes
            </ActionButton>
          </>
        ) : (
          <>
            <OutlinedActionButton onClick={onClose}>Close</OutlinedActionButton>
            <ActionButton
              onClick={() => setEditMode(true)}
              startIcon={<Edit />}
            >
              Edit Profile
            </ActionButton>
          </>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default ProfileDetailsModal;
