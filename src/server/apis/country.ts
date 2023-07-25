/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const get_country = async () => {
  return await axios.get('/country/get');
};

