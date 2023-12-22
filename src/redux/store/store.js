import {configureStore} from '@reduxjs/toolkit';
import profilePhotoReducer from '../slice/profilePhotoSlice';
const store = configureStore({
  reducer: {
    profilePhoto: profilePhotoReducer,
  },
  // middleware, devTools ve diğer ayarlar burada belirtilebilir
});

export default store;
