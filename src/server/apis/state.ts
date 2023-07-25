/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const get_state = async (data: any) => {
  return await axios.post('/state/get',data);
};

