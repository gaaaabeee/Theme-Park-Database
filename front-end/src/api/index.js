import axios from 'axios';

//connects front end to back end, change if needed

export const BASE_URL = 'http://localhost:3000/'; //change to whatever path to website is later

export const ENDPOINTS = {
    customer: 'customer',
};

export const createAPIEndpoint = (endpoint) => {
    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url,newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    };
}