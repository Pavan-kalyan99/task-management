import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, MenuItem, Button } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseAuth/Firebase'; // Firestore instance
import { Timestamp } from 'firebase/firestore';
import { getDatabase, ref, push,set } from "firebase/database";
import { fetchTasks } from '../redux/slice/TaskSlice';
import { useDispatch } from 'react-redux';
import { setAlertMessage } from '../redux/slice/alertSlice';
// Modal Styles
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%', // 90% for extra-small devices
    sm: 400,   // 400px for small devices and above
  },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddtaskModal: React.FC<{ open: boolean; handleClose: () => void }> = ({ open, handleClose }) => {
  const [task, setTask] = useState({
    id: Date.now(),
    title: '',
    description: '',
    category: '',
    dueDate: '',
    status: '',
  });
  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {


    try {
      const db = getDatabase();
      const tasksRef = ref(db, "/tasks"); // Reference to the tasks node
      const newTaskRef = push(tasksRef); // Generate a unique key for the new task
  
      const newTask = {
        id: newTaskRef.key, // Store the generated taskId
        title: task.title,
        description: task.description,
        category: task.category,
        status: task.status,
        dueDate: task.dueDate, // Ensure this is in a valid date string format
        createdAt: new Date().toISOString(),
      };
  
      await set(newTaskRef, newTask);
    
     // fetchTasks()
     //dispatch(fetchTasks());
      dispatch(fetchTasks())
      dispatch(setAlertMessage({ message: 'Task added successfully!', severity: 'success' }));

    //  .then(() => {
    //    handleClose(); // Close the modal after fetching tasks
       
    //    console.log('Task added successfully');
    //  })
    //  .catch((error) => {
    //    console.error('Error fetching tasks:', error);
    //    alert('Failed to load tasks after adding');
    //  });

      handleClose()
      
      //get all tasks
      // fetchTasks()


  
    } catch (error) {
      dispatch(setAlertMessage({ message: 'Failed to add task. Please try again.', severity: 'error' }));

      console.error("Error adding task:", error);
    }

    // try {
    //   await addDoc(collection(db, 'tasks'), {
    //     ...task,
    //     dueDate: new Date(task.dueDate),

    //     createdAt: Timestamp.now(),
    //   });
    //   console.log('Task added successfully');
    //   handleClose();
    //   setTask({title: '', description: '', category: '', dueDate: '', status: '' });
    // } catch (error) {
    //   console.error('Error adding task:', error.message);
    // }
  };
  // useEffect(()=>{
  //   console.log('useeffect is called')
  //  fetchTasks()

  // },[
  // ])

  return (
    <Modal open={open} onClose={handleClose} className='m-1 w-full'>
        
      <Box sx={modalStyle}
    //    style={{width:'300px',maxwidth:'500px'}}
    className='w-full'
       >
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <TextField
          select
          label="Task Category"
          name="category"
          value={task.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
        </TextField>
        <TextField
          type="date"
          label="Due On"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          select
          label="Task Status"
          name="status"
          value={task.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <div className="flex justify-end mt-4">
          <Button onClick={handleClose} color="error" className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary"
             disabled={
              !task.title ||
              !task.description ||
              !task.category ||
              !task.dueDate ||
              !task.status
            }>
            Add Task
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddtaskModal;
