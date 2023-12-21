import axios from 'axios';

const url = 'http://192.168.1.10:3000/decode-token';

export const getUserEmail = async token => {
  console.log('tokennnnnn', token);

  try {
    const response = await axios.post(url, {token});
    console.log('response decode', response.data.decodedToken);

    return response.data.decodedToken.email;
  } catch (error) {
    console.log('response decode error', error);
  }
};
