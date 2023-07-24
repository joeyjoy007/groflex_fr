/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const registerUser = async (data: any) => {
  return await axios.post('/user/', data);
};

export const loginUser = async (data: any) => {
    return await axios.post('/user/login', data);
};

export const getUser = async (data: any) => {
    return await axios.get('/user/get', data);
};

export const deleteUser = async (data: any) => {
    return await axios.patch('/user/delete', data);
};

export const singleUser = async (data: any) => {
    return await axios.post('/user/single', data);
};

export const searhUser = async (data: any) => {
    return await axios.post(`/user/search/${data}`);
};