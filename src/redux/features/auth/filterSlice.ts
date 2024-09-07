// filterSlice.ts
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

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAll(state, action: PayloadAction<boolean>) {
      const value = action.payload;
      state.all = value;
      state.activeOrder = value;
      state.forDelivery = value;
      state.delivered = value;
      state.newOrder = value;
      state.dateOver = value;
      state.deliveryLeftTwoDays = value;
      state.urgent = value;
    },
    toggleActiveOrder(state) {
      state.activeOrder = !state.activeOrder;
    },
    toggleForDelivery(state) {
      state.forDelivery = !state.forDelivery;
    },
    toggleDelivered(state) {
      state.delivered = !state.delivered;
    },
    toggleNewOrder(state) {
      state.newOrder = !state.newOrder;
    },
    toggleDateOver(state) {
      state.dateOver = !state.dateOver;
    },
    toggleDeliveryLeftTwoDays(state) {
      state.deliveryLeftTwoDays = !state.deliveryLeftTwoDays;
    },
    toggleUrgent(state) {
      state.urgent = !state.urgent;
    },
  },
});

export const {
  setAll,
  toggleActiveOrder,
  toggleForDelivery,
  toggleDelivered,
  toggleNewOrder,
  toggleDateOver,
  toggleDeliveryLeftTwoDays,
  toggleUrgent,
} = filterSlice.actions;

export default filterSlice.reducer;
