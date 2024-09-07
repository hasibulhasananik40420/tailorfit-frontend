/* eslint-disable prefer-const */
// // filterSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface FilterState {
//   all: boolean;
//   activeOrder: boolean;
//   forDelivery: boolean;
//   delivered: boolean;
//   newOrder: boolean;
//   dateOver: boolean;
//   deliveryLeftTwoDays: boolean;
//   urgent: boolean;
// }

// const initialState: FilterState = {
//   all: false,
//   activeOrder: false,
//   forDelivery: false,
//   delivered: false,
//   newOrder: false,
//   dateOver: false,
//   deliveryLeftTwoDays: false,
//   urgent: false,
// };

// const allFilterSlice = createSlice({
//   name: 'allfilter',
//   initialState,
//   reducers: {
//     setAllCard(state, action: PayloadAction<boolean>) {
//       const value = action.payload;
//       state.all = value;
//       state.activeOrder = value;
//       state.forDelivery = value;
//       state.delivered = value;
//       state.newOrder = value;
//       state.dateOver = value;
//       state.deliveryLeftTwoDays = value;
//       state.urgent = value;
//     },
//     toggleActiveOrderCard(state) {
//       state.activeOrder = !state.activeOrder;
//     },
//     toggleForDeliveryCard(state) {
//       state.forDelivery = !state.forDelivery;
//     },
//     toggleDeliveredCard(state) {
//       state.delivered = !state.delivered;
//     },
//     toggleNewOrderCard(state) {
//       state.newOrder = !state.newOrder;
//     },
//     toggleDateOverCard(state) {
//       state.dateOver = !state.dateOver;
//     },
//     toggleDeliveryLeftTwoDaysCard(state) {
//       state.deliveryLeftTwoDays = !state.deliveryLeftTwoDays;
//     },
//     toggleUrgentCard(state) {
//       state.urgent = !state.urgent;
//     },
//   },
// });

// export const {
//   setAllCard,
//   toggleActiveOrderCard,
//   toggleForDeliveryCard,
//   toggleDeliveredCard,
//   toggleNewOrderCard,
//   toggleDateOverCard,
//   toggleDeliveryLeftTwoDaysCard,
//   toggleUrgentCard,
// } = allFilterSlice.actions;

// export default allFilterSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  all: boolean;
  activeOrder: boolean;
  forDelivery: boolean;
  delivered: boolean;
  newOrder: boolean;
  dateOver: boolean;
  deliveryLeftTwoDays: boolean;
  urgent: boolean;
}

const initialState: FilterState = {
  all: false,
  activeOrder: false,
  forDelivery: false,
  delivered: false,
  newOrder: false,
  dateOver: false,
  deliveryLeftTwoDays: false,
  urgent: false,
};

const allFilterSlice = createSlice({
  name: 'allfilter',
  initialState,
  reducers: {
    setSingleFilter(state, action: PayloadAction<keyof FilterState>) {
      const filterKey = action.payload;
      // Reset all filters
      for (let key in state) {
        state[key as keyof FilterState] = false;
      }
      // Set the selected filter to true
      state[filterKey] = true;
    },
    resetAllFilters(state) {
      for (let key in state) {
        state[key as keyof FilterState] = false;
      }
    },
  },
});

export const { setSingleFilter, resetAllFilters } = allFilterSlice.actions;

export default allFilterSlice.reducer;

