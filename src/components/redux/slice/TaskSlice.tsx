import { createSlice, createAsyncThunk ,PayloadAction } from '@reduxjs/toolkit';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../../firebaseAuth/Firebase'; // Firebase Realtime Database reference

// Initial State
interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  category: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async Thunk to Fetch Tasks from Realtime Database
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const dbRef = getDatabase();
    const tasksRef = ref(dbRef, 'tasks');
    const snapshot = await get(tasksRef);

    // if (snapshot.exists()) {
    //   const data = snapshot.val();
    //   // Convert Realtime Database object to array with IDs
    //   const tasks: Task[] = Object.keys(data).map((key) => ({
    //     id: key,
    //     ...data[key],
    //   }));
    if (snapshot.exists()) {
      const tasks = Object.entries(snapshot.val() || {}).map(([key, value]) => ({
        id: key, // Include the unique key as `id`
        ...value,
      }));
      return tasks;
    } else {
      console.log('No tasks found');
      return [];
    }
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
});

// Tasks Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === updatedTask.id);

      if (taskIndex >= 0) {
        state.tasks[taskIndex] = updatedTask; // Replace the old task with the updated one
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
export const { updateTask } = taskSlice.actions;

export default taskSlice.reducer;
