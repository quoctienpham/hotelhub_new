import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

export default function DeleteTeamModal({ open, onClose, member, onSuccess, loading, setLoading }) {
  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_API}/admin/team/${member._id}`, {
        method: "DELETE",
      });
      onSuccess(member._id);
      toast.success("Team member deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete team member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {member?.name}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}