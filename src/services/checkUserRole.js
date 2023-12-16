import axios from 'axios';

const url = 'http://192.168.177.116:3000/decode-token';

export const checkUserRole = async token => {
  console.log('tokennnnnn', token);
  try {
    const response = await axios.post(url, {token});
    console.log('response decode', response.data.decodedToken.role);
    return response.data.decodedToken.role;
  } catch (error) {
    console.log('response decode error', error);
  }
};
