import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userProfilePhotoUri: '',
};

const userProfilePhotoSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfilePhoto(state, action) {
      state.userProfilePhotoUri = action.payload;
    },
  },
});

export const {setUserProfilePhoto} = userProfilePhotoSlice.actions;
export default userProfilePhotoSlice.reducer;
