import axios from 'axios';
import {serverUrl} from '../constants/serverUrl';

const url = serverUrl + '/decode-token';

export const getUserEmail = async token => {
  console.log('tokennnnnn', token);

  try {
    const response = await axios.post(url, {token});
    console.log('response decode', response.data.decodedToken);

    return response.data.decodedToken.email;
  } catch (error) {
    console.log('response decode error email', error);
  }
};
