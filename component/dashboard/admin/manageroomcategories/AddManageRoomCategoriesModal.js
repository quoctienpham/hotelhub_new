import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Stack,
  Input,
  Button,
  Avatar,
} from "@mui/material";
import { toast } from "react-toastify";
import { modalStyle } from "./styles";

export default function AddManageRoomCategoriesModal({ open, onClose, onSuccess, loading, setLoading }) {
  const [newMember, setNewMember] = useState({
    name: "",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddMember = async () => {
    if (!newMember.name ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
   
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/roomtype`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMember.name,
         
        //  image: imageUrl,
        }),
      });

      const data = await response.json();
      onSuccess(data);
      toast.success("Team member added successfully");
      setNewMember({
        name: "",
   
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add team member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-team-modal">
      <Box sx={modalStyle}>
        <h2 style={{
          marginTop: 0,
          marginBottom: "12px",
          fontWeight: 700,
          fontSize: "1.75rem",
          color: "#1a202c",
        }}>
          Add New RoomType
        </h2>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            variant="outlined"
            disabled={loading}
            InputLabelProps={{ style: { color: "#8A12FC" } }}
            sx={{
              input: { color: "black" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#8A12FC" },
                "&:hover fieldset": { borderColor: "#8A12FC" },
                "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
              },
            }}
          />

        

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ borderRadius: "12px" }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddMember}
              sx={{ backgroundColor: "#8A12FC", "&:hover": { backgroundColor: "#7a0eeb" } }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}