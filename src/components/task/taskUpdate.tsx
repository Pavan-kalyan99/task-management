// import React ,{}from "react";
import { ref, update } from "firebase/database";
import { db } from "./../firebaseAuth/Firebase"; // Replace with your actual Firebase config file path
import { useDispatch } from "react-redux";
import { setAlertMessage } from "../redux/slice/alertSlice";
import { fetchTasks } from "../redux/slice/TaskSlice";

interface TaskUpdateProps {
  taskId: string;
  newStatus: { status: string };
}

export const taskUpdate = async ({ taskId, newStatus }: TaskUpdateProps): Promise<void> => {
  const dispatch =useDispatch<AppDispatch>();
    try {
        const taskRef = ref(db, `tasks/${taskId}`);
        await update(taskRef, newStatus); // Update the task status in Firebase
        dispatch(setAlertMessage({ message: 'Task status is Updated ', severity: 'success' }));
        dispatch(fetchTasks())
       
        console.log("Task updated successfully:", { taskId, newStatus });
      } catch (error) {
        dispatch(setAlertMessage({ message: 'Failed to update Task status', severity: 'error' }));

        console.error("Error updating task status:", error);
      }

    //     useEffect(() => {
//     const handleSave = async () => {
//         console.log('task update is called..')
//       try {
//         const taskRef = ref(db, `tasks/${taskId}`);
//         await update(taskRef, newStatus); // Update the status in Firebase
//         console.log("Task updated successfully:", { taskId, newStatus });
//       } catch (error) {
//         console.error("Error updating task status:", error);
//       }
//     };

//     handleSave();
//   }, [taskId, newStatus]);

  return null; // This component doesn't render anything visible
};

 //export default taskUpdate;
