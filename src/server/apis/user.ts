/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const registerUser = async (data: any) => {
  return await axios.post('/user/', data);
};

export const loginUser = async (data: any) => {
    return await axios.post('/user/login', data);
};

export const getUser = async () => {
    return await axios.get('/user/get');
};

export const deleteUser = async (data: any) => {
    return await axios.patch('/user/delete', data);
};

export const singleUser = async (data: any) => {
    return await axios.post('/user/single', data);
};

export const searhUser = async (data: any) => {
    return await axios.post(`/user/search/${data?.target?.value}`);
};

export const updateUser = async (data: any) => {
    console.log("aa",data)
    return await axios.patch('/user/update',data);
};

export const paginate = async (data: any) => {
    return await axios.post('/user/page',data);
};

export const reset_password = async (data: any) => {
    return await axios.patch('/user/password',data);
};

export const reset_password_by_mail = async (data: any) => {
    return await axios.patch('/user/mail',data);
};