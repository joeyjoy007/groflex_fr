/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const apiEndPoint = 'http://localhost:4000';


const handleError = (error: { isAxiosError: any; response: { data: any } }) => {
    let message = '';

    const { data } = error.response;
    message = data.message;

    return Promise.reject({ message });
};

function isNetworkError(err: { isAxiosError: any; response: { data: any } }) {
    return !!err.isAxiosError && !err.response;
}

export function setUpAxios() {
    axios.defaults.baseURL = apiEndPoint;
    console.log('axios', axios.interceptors.response);
    // @ts-ignore 
    if (axios.interceptors.response.handlers.length === 0) {
        axios.interceptors.response.use(
            (response) => {
                console.log('Response sucess', response.data);
                return response.data;
            },
            (error) => {
                console.log('error => ', error.response);
                if (isNetworkError(error)) {
                    const message = 'Network Error';
                    return Promise.reject({ message });
                }
                return handleError(error);
            },
        );
    }
}