import axios from 'axios';
import {serverUrl} from '../constants/serverUrl';

const url = serverUrl + '/decode-token';

export const checkUserRole = async token => {
  console.log('tokennnnnn', token);

  try {
    const response = await axios.post(url, {token});
    console.log('response decode', response.data.decodedToken);

    return response.data.decodedToken.role;
  } catch (error) {
    console.log('response decode errorrrrrr', error);
  }
};
