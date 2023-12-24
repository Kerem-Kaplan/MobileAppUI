import {configureStore} from '@reduxjs/toolkit';
import userProfilePhotoReducer from '../slice/userProfilePhotoSlice';
import observerProfilePhotoReducer from '../slice/observerProfilePhotoSlice';
const store = configureStore({
  reducer: {
    userProfilePhoto: userProfilePhotoReducer,
    observerProfilePhoto: observerProfilePhotoReducer,
  },
  // middleware, devTools ve diğer ayarlar burada belirtilebilir
});

export default store;
