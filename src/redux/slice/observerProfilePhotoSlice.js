import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  observerProfilePhotoUri: '',
};

const observerProfilePhotoSlice = createSlice({
  name: 'observerProfile',
  initialState,
  reducers: {
    setObserverProfilePhoto(state, action) {
      state.observerProfilePhotoUri = action.payload;
    },
  },
});

export const {setObserverProfilePhoto} = observerProfilePhotoSlice.actions;
export default observerProfilePhotoSlice.reducer;
