// import React, { useState } from "react";
// import { Box, Typography, Paper, } from "@mui/material";
// import Grid from "@mui/material/Grid";


// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // Define task and column types
// interface Task {
//   id: string;
//   title: string;
// }

// interface Column {
//   id: string;
//   title: string;
//   taskIds: string[];
// }

// const initialTasks: Record<string, Task> = {
//   "task-1": { id: "task-1", title: "Task One" },
//   "task-2": { id: "task-2", title: "Task Two" },
//   "task-3": { id: "task-3", title: "Task Three" },
//   "task-4": { id: "task-4", title: "Task Four" },
// };

// const initialColumns: Record<string, Column> = {
//   "column-todo": {
//     id: "column-todo",
//     title: "Todo",
//     taskIds: ["task-1", "task-2"],
//   },
//   "column-inprogress": {
//     id: "column-inprogress",
//     title: "In Progress",
//     taskIds: ["task-3"],
//   },
//   "column-complete": {
//     id: "column-complete",
//     title: "Complete",
//     taskIds: ["task-4"],
//   },
// };

// const handleDragEnd: React.FC = () => {
//   // eslint-disable-next-line no-unused-vars

//   const [tasks, setTasks] = useState(initialTasks);
//   const [columns, setColumns] = useState(initialColumns);
//   // eslint-disable-next-line no-unused-vars
//   const onDragEnd = (result: any) => {
//     const { destination, source, draggableId } = result;

//     // If dropped outside a column or in the same position, do nothing
//     if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
//       return;
//     }

//     // Remove the task from the source column
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];

//     const sourceTaskIds = Array.from(sourceColumn.taskIds);
//     sourceTaskIds.splice(source.index, 1);

//     const destTaskIds = Array.from(destColumn.taskIds);
//     destTaskIds.splice(destination.index, 0, draggableId);

//     setColumns({
//       ...columns,
//       [sourceColumn.id]: {
//         ...sourceColumn,
//         taskIds: sourceTaskIds,
//       },
//       [destColumn.id]: {
//         ...destColumn,
//         taskIds: destTaskIds,
//       },
//     });
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//     <Grid container spacing={2}>
//       {Object.values(columns).map((column) => (
//         <Grid item xs={12} sm={4} key={column.id}>
//           <Droppable droppableId={column.id}>
//             {(provided) => (
//               <Box
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 sx={{
//                   backgroundColor: "#f0f0f0",
//                   padding: 2,
//                   borderRadius: 2,
//                   minHeight: "300px",
//                   width: "400px",
//                 }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   {column.title}
//                 </Typography>
//                 {column.taskIds.map((taskId, index) => {
//                   const task = tasks[taskId];
//                   return (
//                     <Draggable
//                       key={task.id}
//                       draggableId={task.id}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <Paper
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           sx={{
//                             padding: 2,
//                             marginBottom: 1,
//                             backgroundColor: "#ffffff",
//                             borderRadius: 2,
//                             boxShadow: 1,
//                           }}
//                         >
//                           <Typography variant="subtitle1">
//                             {task.title}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             color="textSecondary"
//                             gutterBottom
//                           >
//                             Due: {task?.dueDate}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             Category: {task?.category}
//                           </Typography>
//                         </Paper>
//                       )}
//                     </Draggable>
//                   );
//                 })}
//                 {provided.placeholder}
//               </Box>
//             )}
//           </Droppable>
//         </Grid>
//       ))}
//     </Grid>
//   </DragDropContext>
//   );
// };

// export default DragAndDropTasks;
