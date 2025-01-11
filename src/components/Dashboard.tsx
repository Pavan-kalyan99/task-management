import React ,{useState}from 'react'
import Header from './Header'
import AddTaskModal from './task/AddtaskModel'
import MainDashboard from './userTasks/MainDashboard';
import useDebounce from './hooks/useDebounce';
// eslint-disable-next-line no-unused-vars
import { Box, Dialog, Button } from '@mui/material';
import { FiSearch } from "react-icons/fi";
// import { AiOutlinePlus } from "react-icons/ai";
// import DragAndDropTasks from './userTasks/DragAndDropTasks';
import { FaListAlt } from "react-icons/fa";
import { BsClipboardDataFill } from "react-icons/bs";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line no-unused-vars
// import { ref, update } from "firebase/database";
// eslint-disable-next-line no-unused-vars
// import { db } from './firebaseAuth/Firebase';
// eslint-disable-next-line no-unused-vars

// import LogOut from './auth/LogOut';


interface DateRange {
  startDate: any | null;
  endDate: any | null;
}
const Dashboard:React.FC = () => {
  // const [open, setOpen] = useState(false);
  const [taskopen,setTaskOpen]=useState(false);

  const handleOpen = () => setTaskOpen(true);
  const handleClose = () => setTaskOpen(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const [selectedTab, setSelectedTab] = useState<any>("list"); // State for active tab

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: dayjs().startOf('month'),
    endDate: dayjs().endOf('month'),
  });
  const handleDueDateClick = () => {
    setShowDatePicker((prev) => !prev);
  };
  
// date range change
  const handleDateChange = (newValue: [Date | null, Date | null]) => {
    setDateRange({
      startDate: newValue[0],
      endDate: newValue[1],
    });
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSearchQuery(e.target.value);
  };
//================ tabs
//const renderTabContent = () => {
 // setSelectedTab()
  // switch (selectedTab) {
  //   case "list":
  //     return (
  //       <MainDashboard
  //         selectedCategory={selectedCategory}
  //         searchQuery={debouncedSearch}
  //       />
  //     );
  //   case "board":
  //     return <div><DragAndDropTasks/></div>; // Replace with your Analytics component
  //   case "settings":
  //     return <div>Settings Content</div>; // Replace with your Settings component
  //   default:
  //     return null;
  // }
//};

  return (
    <div className='m-1'>
        {/* <h1>Dashboard page</h1> */}
        <Header/>
          {/* tabs */}
       <div className="flex space-x-4 border-b border-gray-300 mb-4">

        <div
          className={`px-4 flex py-2 ${selectedTab === "list" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setSelectedTab("list")}
        >
          <div className='m-1'>
          <FaListAlt/>

          </div>
          

         <div>List</div>
        

        </div>
        <div
          className={`px-4 flex py-2 ${selectedTab === "board" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setSelectedTab("board")}
        >
          <div className='m-1'>

          <BsClipboardDataFill />
          </div>
          <div>Board  </div>
        
        </div>
        {/* <div className='flex ' style={{}}>  
          
          <LogOut/>
         
         </div> */}
        </div>
        {/* ------------ */}
       <div className="flex flex-wrap items-center justify-between p-4 bg-gray-100 border border-gray-300 rounded-md">
    
      {/* Filter Section */}
      <div className="flex items-center space-x-2">
        <label htmlFor="filter" className="text-sm font-medium">
          Filter by:
        </label>
        <select
          id="filter"
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">Category</option>
          <option value="work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button
        onClick={handleDueDateClick}
        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Due Date
      </button>
        {/* data range picker */}
        {/* {showDatePicker &&  */}
        <Dialog open={showDatePicker} onClose={handleDueDateClick} maxWidth="sm" fullWidth>
        <Box padding={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateRangePicker',
          'MobileDateRangePicker',
          'DesktopDateRangePicker',
          'StaticDateRangePicker',
        ]}
      >
       
      
        <DemoItem label="Static variant" component="StaticDateRangePicker">
             {/* defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]} */}
            {/* // defaultValue={[currentMonthStart, currentMonthEnd]} // Set current month */}
            <StaticDateRangePicker
            value={[dateRange.startDate, dateRange.endDate]}
            onChange={handleDateChange}
            sx={{
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                alignItems: 'center',
              },
            }}
            slots={{
              actionBar: () => null, // Removes the action bar containing OK/Cancel buttons
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button onClick={handleDueDateClick} variant="contained" color="primary">
              Apply
            </Button>
          </Box>
      {/* } */}
      </Box>
      </Dialog>

        {/* --------- */}
      </div>

      {/* Search and Add Task Section */}
      <div className="flex items-center space-x-4">
      <div className="relative">

      <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-8 border border-gray-300 rounded px-2 py-1 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
      </div>


        {/* Add Task Button */}
        <button
          onClick={handleOpen}
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition-all"
        >
          Add Task
        </button>
      </div>

      {/* Add Task Modal */}
      {taskopen && (
        <AddTaskModal open={taskopen} handleClose={handleClose} />
      )}
    </div>
    {/* {renderTabContent()} */}

        <MainDashboard selectedCategory={selectedCategory} searchQuery={debouncedSearch} type={selectedTab} dateRange={dateRange}/>

      
    </div>
  )
}

export default Dashboard
