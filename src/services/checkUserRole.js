import axios from 'axios';
import {tokens} from '../constants/tokens';

const url = 'http://192.168.1.10:3000/decode-token';

export const checkUserRole = async token => {
  console.log('tokennnnnn', token);

  try {
    const response = await axios.post(url, {token});
    console.log('response decode', response.data.decodedToken);
    const email = response.data.decodedToken.email;
    const loginToken = {email: email, token: token};
    const isHas = tokens.some(token => token.email === loginToken.email);
    if (!isHas) {
      tokens.push(loginToken);
    } else {
      const index = tokens.findIndex(obj => obj.email === email);
      if (index !== -1) {
        tokens[index].token = token;
      }
    }
    console.log('Tokens', tokens);

    return response.data.decodedToken.role;
  } catch (error) {
    console.log('response decode error', error);
  }
};
