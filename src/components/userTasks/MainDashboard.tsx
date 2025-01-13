import React, { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Collapse,
  Box,
  Typography,
  // MenuItem, Select 

} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from "@mui/material/Grid";
// import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
// import Checkbox from '@mui/material/Checkbox';


import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from "../redux/slice/TaskSlice";
import { AppDispatch, RootState } from "../redux/slice/store";
// import IconButton from '@mui/material/IconButton';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { HiDotsHorizontal } from "react-icons/hi";
import EditTaskModal from "../task/EditTaskModal";
import { getDatabase, ref, remove ,push,set,update} from "firebase/database";
// import DragAndDropTasks from "./DragAndDropTasks";
// import {taskUpdate} from "../task/taskUpdate";
import { setAlertMessage } from "../redux/slice/alertSlice";
import { db } from "../firebaseAuth/Firebase";
interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "To-Do" | "In-Progress" | "Completed";
  category: "Work" | "Personal";
}
interface MainDashboardProps {
  selectedCategory: string;
  searchQuery: string;
  // type:string;
  type: "list" | "board";
  dateRange:any;


}
const MainDashboard: React.FC <MainDashboardProps>= ({selectedCategory ,searchQuery,type,dateRange}) => {
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line no-unused-vars
  const { tasks,  } = useSelector((state: RootState) => state.tasks);
  // const  state  = useSelector((state: RootState) => state);
  
   //console.log('state type:',type);
  // console.log('main task:',tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  // eslint-disable-next-line no-unused-vars
  // const [tasksD, setTasks] = useState<Task[]>([
  //   //{title:'',dueDate:''  }, 
  //   // { id: 1, title: "Interview with Design Team", dueDate: "Today", status: "To-Do", category: "Work" },
  //   // { id: 2, title: "Team Meeting", dueDate: "30 Dec, 2024", status: "To-Do", category: "Personal" },
  //   // { id: 3, title: "Design a Dashboard page", dueDate: "31 Dec, 2024", status: "To-Do", category: "Work" },
  //   // { id: 4, title: "Morning Workout", dueDate: "Today", status: "In-Progress", category: "Work" },
  //   // { id: 5, title: "Code Review", dueDate: "Today", status: "In-Progress", category: "Personal" },
  //   // { id: 6, title: "Submit Project Proposal", dueDate: "Today", status: "Completed", category: "Work" },
  
  // ]);

  const [newTask, setNewTask] = useState({ id:'', title: "", dueDate: "", status: "", category: "" });
  const [showForm, setShowForm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    "To-Do": true,
    "In-Progress": true,
    "Completed": false,
  });
  // const [isEditing, setIsEditing] = useState(false);
  // const [newStatus, setNewStatus] = useState('');

  const handleAddTask = async() => {
    if (newTask.title.trim()) {
      setNewTask(
        // ...tasks,
        { id: Date.now() as any, title: newTask.title, dueDate: newTask.dueDate || "No Date", status: newTask.status as any, category: newTask.category as any },
      );
      try {
            const db = getDatabase();
            const tasksRef = ref(db, "/tasks"); // Reference to the tasks node
            const newTaskRef = push(tasksRef); // Generate a unique key for the new task
        
            const newTaskData = {
              id: newTaskRef.key, // Store the generated taskId
              title: newTask.title,
              // description: newTask?.description,
              category: newTask.category,
              status: newTask.status,
              dueDate: newTask.dueDate, // Ensure this is in a valid date string format
              createdAt: new Date().toISOString(),
            };
        
            await set(newTaskRef, newTaskData);
            dispatch(setAlertMessage({ message: 'Task is Added ', severity: 'success' }));
            dispatch(fetchTasks())


            console.log("Task added successfully");
          } catch (error) {
            console.error("Error adding task:", error);
            dispatch(setAlertMessage({ message: 'Failed to add Task', severity: 'error' }));

          }
      //     try{

      // }
      // catch(error)
      // {
      //  console.log('error:',error)
      // }
     // setNewTask({ title: "", dueDate: "", status: "To-Do", category: "Work" });
      setShowForm(false);
    }
  };

  // const handleDeleteTask = (id: number) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
// ========filter task
  // Filter tasks by selected category
  const filteredTasks = selectedCategory === "All"
    ? tasks
    : tasks.filter((task) => task.category === selectedCategory);

     // Filter tasks by search query (searching task title)
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //// Filter tasks by due date range
const filteredByDueDate = dateRange.startDate && dateRange.endDate
? searchedTasks.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    // const due_startDate = dateRange.startDate;
//  console.log('line 151 :',taskDueDate)
     const due_startDate = new Date(dateRange.startDate);
    //  console.log('line 153 :',due_startDate)

     const due_endDate = new Date(dateRange.endDate);

    return taskDueDate >= due_startDate && taskDueDate <= due_endDate;
  })
: searchedTasks;
// console.log('fil date:',filteredByDueDate);
  const groupedTasks = filteredByDueDate.reduce((groups: any, task) => {
    groups[task.status] = [...(groups[task.status] || []), task];
    return groups;
  }, {});
  console.log(groupedTasks)
  //  if (type ==='board'){
  //   return(
  //     <div>board</div>
  //   )
  //  }
  // date
   // Helper function to format dueDate
  //  const formatDueDate = (dueDate: any) => {
  //   if (dueDate?.seconds) {
  //     return new Date(dueDate.seconds * 1000).toLocaleDateString();
  //   }
  //   return "No Date";
  // };
  //
  // eslint-disable-next-line no-unused-vars
  // const formatDueDate = (dueDate: { seconds: number; nanoseconds: number }): string => {
  //   if (!dueDate || !dueDate.seconds) return "No Date"; // Handle invalid or missing dates
  //   const date = new Date(dueDate.seconds * 1000); // Convert seconds to milliseconds
  //   return date.toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   }); // Format as "Jan 8, 2025"
  // };

// ========================task edit and update
const [menuVisibility, setMenuVisibility] = useState<number | null>(null);
const [visibleDots,setvisibleDots] =useState(false);
const [task_status, settask_status] = useState<string | ''>('');

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTask, setSelectedTask] = useState<Task | any>(null);

const handleEditTask = (task: Task) => {
   console.log('edit task:',task);
  setSelectedTask(task);
  setIsModalOpen(true);
};

const toggleMenu = (taskId: number) => {
  setMenuVisibility((prev) => (prev === taskId ? null : taskId));
  setvisibleDots(true);
};
const handleEditModal =()=>{
  setIsModalOpen(false);
  setvisibleDots(false);
}

// if(type==='board'){
//   setMenuVisibility('');
// }

  // eslint-disable-next-line no-unused-vars
// const handleEditTask1 = (task: any,open:boolean) => {
//   // dispatch(EditTaskModal(task, open={open}) ); // Replace with your Redux action
//  // dispatch(EditTaskModal(task,open)); // Replace with your Redux action
//  <EditTaskModal
//  task={selectedTask}
//  isOpen={isModalOpen}
//  onClose={() => setIsModalOpen(false)}
// />
// };

// ddelete task 
const handleDeleteTask = async(taskId: number) => {
  //  console.log('del id:',taskId);
   try {
    const db = getDatabase();
    const taskRef = ref(db, `/tasks/${taskId}`); // Reference to the task by ID

    await remove(taskRef);

    dispatch(setAlertMessage({ message: 'Task is Deleted ', severity: 'success' }));
   dispatch(fetchTasks())
   setvisibleDots(false)
    

    // console.log(`Task with ID ${taskId} deleted successfully`);
  } catch (error) {
    dispatch(setAlertMessage({ message: 'Failed to Deleting Task ', severity: 'error' }));

    console.error("Error deleting task:", error);
  }
  //dispatch(deleteTaskAction(taskId)); // Replace with your Redux action
};
// ======list task status is  updating============
  // const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

  // const handleClose = () => {
  //   settask_status('');
  // };
const handleStatusChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedStatus = event.target.value;
  if(selectedStatus && task_status){
    
    //======== API call to update task status
    // try {
    //   await taskUpdate({
    //     taskId: task_status,
    //     newStatus: { status: selectedStatus },
    //   });
    // } catch (error) {
    //   console.error("Failed to update task status:", error);
    // }
     try {
            const taskRef = ref(db, `tasks/${task_status}`);
            await update(taskRef, {status:selectedStatus}); // Update the task status in Firebase
            dispatch(setAlertMessage({ message: 'Task status is Updated ', severity: 'success' }));
            dispatch(fetchTasks())
           
          } catch (error) {
            dispatch(setAlertMessage({ message: 'Failed to update Task status', severity: 'error' }));
    
            console.error("Error updating task status:", error);
          }

  }
  else{
    settask_status('');
  }
 

 // taskUpdate(task_status, selectedStatus);
  //setNewStatus(selectedStatus);
};

const toggleStatus = (taskId: any,) => {
  settask_status((prev) => (prev === taskId ? '' : taskId));
};
// const setIsEditingHandle=({task})=>{
// setIsEditing(true);
// setNewStatus(task.status)
// }
const handleBlur = () => {
// setIsEditing(false);

  // Call API only if the status has changed
 // if (newStatus !== task.status) {
   // 
 // }
};
// ===

// =============================

// ======
const handleDragEnd = async(result: any) => {
  const { source, destination, draggableId } = result;

  if (!destination) return; // If dropped outside any droppable area

  if (source.droppableId !== destination.droppableId) {
    const taskId = draggableId;
    const newStatus = destination.droppableId;
    //======== API call to update task status
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await update(taskRef, {status:newStatus}); // Update the task status in Firebase
      dispatch(setAlertMessage({ message: 'Task status is Updated ', severity: 'success' }));
      dispatch(fetchTasks())
     
    } catch (error) {
      dispatch(setAlertMessage({ message: 'Failed to update Task status', severity: 'error' }));

      console.error("Error updating task status:", error);
    }


    // try {
    //   await taskUpdate({
    //     taskId: draggableId,
    //     newStatus: { status: newStatus },
    //   });
    // } catch (error) {
    //   console.error("Failed to update task status:", error);
    // } 
  
  }
};

if (type==='list'){
  return (
    <div className="mx-auto">
    <Table aria-label="task table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Task name</TableCell>
          <TableCell align="right">Due On</TableCell>
          <TableCell align="right">Task Status</TableCell>
          <TableCell align="right">Category</TableCell>
          <TableCell align="right"></TableCell>
          {/* <TableCell align="right">C</TableCell> */}


        </TableRow>
      </TableHead>
      <TableBody>
        {["todo", "inprogress", "completed"].map((status) => (
          <React.Fragment key={status}>
            {/* Status Section Header */}
            <TableRow>
              <TableCell colSpan={6} 
   className={`font-bold flex justify-between items-centers" ${
    status === "todo"
      ? "bg-pink-300"
      : status === "inprogress"
      ? "bg-blue-300"
      : "bg-green-300"
  }`}              >
              
                <div className="flex justify-between items-center gap-4">
                <span>
                  {status} ({groupedTasks[status]?.length || 0})
                </span>
                
                  <button
                    onClick={() => toggleSection(status)}
                    className=" text-gray-700"
                  >
                    {expandedSections[status] ? "▲" : "▼"}
                  </button>
                </div>
              </TableCell>
            </TableRow>
  
            {/* Add Task Form */}
                     {status === "todo" && (
            <TableCell colSpan={5} className="bg-white" >
                    <button
                      onClick={() => setShowForm((prev) => !prev)}
                      className="text-sm text-purple-700 font-medium"
                    >
                      + ADD TASK
                    </button>
                </TableCell>
                  )}
            {status === "todo" && showForm && (
              <>
              
              <TableRow
                sx={{
                  "& td": {
                    border: 0, // Remove borders from all cells in the row
                  },
                }}
              >
             
                <TableCell className="bg-white">
                  {/* <div className="p-1"> */}
                    <input
                      type="text"
                      placeholder="Task Title"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="border flex rounded p-2 mb-2"
                    />
                   </TableCell>
                   
                   <TableCell>

                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                      className="border rounded p-2 w-full mb-2"
                    />
                       </TableCell>

                     <TableCell>
                    {/* <div className="flex gap-2 mb-2"> */}
                      <select
                        value={newTask.status}
                        onChange={(e) =>
                          setNewTask({ ...newTask, status: e.target.value })
                        }
                        className="border rounded p-2"
                      >
                        {/* <option>To-Do</option>
                        <option>In-Progress</option>
                        <option>Completed</option> */}
                         <option>todo</option>
                        <option>inprogress</option>
                        <option>completed</option>
                      </select>
                      </TableCell>
                      <TableCell>

                      <select
                        value={newTask.category}
                        onChange={(e) =>
                          setNewTask({ ...newTask, category: e.target.value })
                        }
                        className="border rounded p-2"
                      >
                        <option value='work'>Work</option>
                        <option value='Personal'>Personal</option>
                      </select>
                      </TableCell>

                    {/* </div> */}
                 
                  
                  {/* </div> */}
                {/* </TableCell> */}
            
                
              
              </TableRow>
              <TableRow >
                    <button
                      onClick={handleAddTask}
                      className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                    >
                      ADD
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-600"
                    >
                      CANCEL
                    </button>
                    </TableRow>
              </>
              
            )}
  
            {/* Task Rows */}
            {/* {JSON.stringify(groupedTasks)} */}
            {
            expandedSections[status] &&
              groupedTasks[status]?.map((task: Task) => (
                <TableRow key={task.id}  className="bg-slate-100">
                       <TableCell  style={{paddingLeft:'20px',paddingRight:'0px',margin:'0px',width:'0px'}}>
                       {status === 'completed' ? (
                       <FaCheckCircle color="green"/>) : <FaCheckCircle />

                       }

        </TableCell>

                    <TableCell align="left">
                    {/* {status === 'completed' ? (
    <IoIosCheckmarkCircle />
  ) : (
    <FaCheckCircle />
  )} */}
  <span className={` ${status==='completed'? 'line-through' :''} `}>{task.title}</span>
</TableCell>
                  <TableCell align="right">{task.dueDate}</TableCell>
                  {/* <TableCell align="right">{formatDueDate(task.dueDate)}</TableCell> */}
                  {/* <TableCell align="right">{task.status}</TableCell> */}
                  <TableCell align="right">
                  {task_status === task.id.toString()  ? (
          <select
            value={task.status}
            onChange={handleStatusChange}
            onBlur={handleBlur} // API call made when the select loses focus
           // onClose={handleClose}
            // open='false'

            // autoWidth
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
           <span onClick={()=>toggleStatus(task?.id)} style={{ cursor: 'pointer' }}>
             {task.status}
           </span>
        )}

                  </TableCell>

                  <TableCell align="right">{task.category}</TableCell>
                  <TableCell align='right'>

                  <HiDotsHorizontal onClick={() => toggleMenu(task.id)} className="cursor-pointer" />
    {visibleDots && menuVisibility === task.id && (
      <div className="absolute bg-white border rounded shadow-md z-10">
        <button
          onClick={() => handleEditTask(task)}
          className="block px-4 py-2 text-left w-full hover:bg-gray-100"
        >
          Edit Task
        </button>
        {/* delete task */}

        <button
          onClick={() => handleDeleteTask(task.id)}
          className="block px-4 py-2 text-left w-full hover:bg-gray-100"
        >
          Delete Task
        </button>
      </div>
    )}
                  
                  </TableCell>
                </TableRow>
              ))}
              {isModalOpen && selectedTask && (
  <EditTaskModal
    task={selectedTask} 
    isOpen={isModalOpen}
    onClose={handleEditModal}
  />
              )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  </div>
  

  );
}
if(type==='board'){

   // toggleSection('todo')
return(
    <div>
  <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        {["todo", "inprogress", "completed"].map((status) => (
          <Grid item xs={12} sm={4} key={status}>
            <Droppable droppableId={status}>
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    padding: 2,
                    borderRadius: 2,
                    minHeight: "300px",
                    width: "300px",
                  }}
                >
                  <Typography variant="h6" gutterBottom   
                   className={`font-bold flex justify-between items-centers" ${
    status === "todo"
      ? "bg-pink-300"
      : status === "inprogress"
      ? "bg-blue-300"
      : "bg-green-300"
  }`} >
                    {status.charAt(0).toUpperCase() + status.slice(1) }
                  </Typography>
                  {groupedTasks[status]?.map((task:any, index:any) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            padding: 2,
                            marginBottom: 1,
                            backgroundColor: "#ffffff",
                            borderRadius: 2,
                            boxShadow: 1,
                          }}
                        >
                          <div className="flex justify-between h-48">
                          <Typography  className={`font-bold text-2xl ${status==='completed'? 'line-through' :''} `} >
                            {task.title}
                          </Typography>
                          <Typography>
                           {/* more  ... option here */}
                           <HiDotsHorizontal onClick={() => toggleMenu(task.id)} className="cursor-pointer" />
    {menuVisibility === task.id && (
      <div className="absolute bg-white border rounded shadow-md z-10">
        <button
          onClick={() => handleEditTask(task)}
          className="block px-4 py-2 text-left w-full hover:bg-gray-100"
        >
          Edit Task
        </button>
        {/* delete task */}

        <button
          onClick={() => handleDeleteTask(task.id)}
          className="block px-4 py-2 text-left w-full hover:bg-gray-100"
        >
          Delete Task
        </button>
      </div>
    )}
                          </Typography>

                          </div>
                         
                          <div className="flex justify-between">
                          <Typography variant="body2" color="textSecondary">
                            C:{task.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            D{task.dueDate}
                          </Typography>
                          </div>
                        
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Grid>
        ))}
      </Grid>
      {isModalOpen && selectedTask && (
  <EditTaskModal
    task={selectedTask}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
  />
              )}
    </DragDropContext>
    
    </div>
  )
}
return null;


}

export default MainDashboard;
