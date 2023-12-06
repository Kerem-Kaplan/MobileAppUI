import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducer/index'; // root reducer dosyasının yolunu belirtin

const store = configureStore({
  reducer: rootReducer,
  // middleware, devTools ve diğer ayarlar burada belirtilebilir
});

export default store;
