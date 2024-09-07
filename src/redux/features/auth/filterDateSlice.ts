
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FilterState {
//   filterDate: Date | null;
// }

// const initialState: FilterState = {
//   filterDate: null,
// };

// const filterDateSlice = createSlice({
//   name: 'filterDate',
//   initialState,
//   reducers: {
//     setFilterDate: (state, action: PayloadAction<Date | null>) => {
//       state.filterDate = action.payload;
//     },
//   },
// });

// export const { setFilterDate } = filterDateSlice.actions;
// export default filterDateSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your Item
interface Item {
  id: string;
  date: string; // Date stored as string in 'YYYY-MM-DD' format
}

interface FilterState {
  filterDate: Date | null;
  data: Item[]; // Original data
  filteredData: Item[]; // Data after applying the filter
}

const initialState: FilterState = {
  filterDate: null,
  data: [], // This will be populated with initial data
  filteredData: [], // This will hold the filtered results
};

const filterDateSlice = createSlice({
  name: 'filterDate',
  initialState,
  reducers: {
    // Action to set the filter date and filter the data accordingly
    setFilterDate: (state, action: PayloadAction<Date | null>) => {
      state.filterDate = action.payload;
      if (action.payload) {
        const selectedDateString = action.payload.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
        state.filteredData = state.data.filter(item => 
          item.date === selectedDateString // Filter based on date match
        );
      } else {
        state.filteredData = state.data; // Reset to all data if no date is selected
      }
    },

    // Action to set the original data
    setData: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
      state.filteredData = action.payload; // Initially, show all data
    },
  },
});

export const { setFilterDate, setData } = filterDateSlice.actions;
export default filterDateSlice.reducer;

  
