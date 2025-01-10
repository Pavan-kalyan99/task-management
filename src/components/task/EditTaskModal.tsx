import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { getDatabase, ref, update ,} from "firebase/database";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseAuth/Firebase";
import { fetchTasks, updateTask } from "../redux/slice/TaskSlice";
import { useDispatch } from "react-redux";
import { setAlertMessage } from "../redux/slice/alertSlice";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  dueDate: string; // Use string to represent dates in 'YYYY-MM-DD' format
}

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, isOpen, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
    status: task.status,
    dueDate: task.dueDate,
  });
  const dispatch = useDispatch<AppDispatch>();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSave = async () => {
  //   try {
  //     const db = getDatabase();
  //     const taskRef = ref(db, `tasks/${task.id}`); // Update the task using its ID

  //     const updatedTaskForDB = {
  //       ...updatedTask,
  //     };

  //     // Update the task in the Realtime Database
  //     await update(taskRef, updatedTaskForDB);

  //     console.log("Task updated successfully:", updatedTaskForDB);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };
  // edit
  
  const handleSave = async () => {
   
    try {
      const taskRef = ref(db, `tasks/${task.id}`);
      await update(taskRef, updatedTask); // Update Firestore
      dispatch(setAlertMessage({ message: 'Task is Updated ', severity: 'success' }));
      dispatch(fetchTasks())
      
      onClose();
    } catch (error) {
      dispatch(setAlertMessage({ message: 'Task in Updating Task', severity: 'error' }));

      console.error("Error updating task:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="edit-task-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Edit Task</h2>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Due Date"
          name="dueDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={updatedTask.dueDate}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={updatedTask.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          name="status"
          value={updatedTask.status}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
