import {combineReducers} from 'redux';
import counterReducer from '../slice/slice'; // veya slice'ın yolunu belirtin

const rootReducer = combineReducers({
  counter: counterReducer,
  // diğer reducer'ları buraya ekleyebilirsiniz
});

export default rootReducer;
