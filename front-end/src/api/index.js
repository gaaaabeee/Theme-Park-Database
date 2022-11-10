import axios from 'axios';

//connects front end to back end, change if needed

export const BASE_URL = 'https://cosc3380-park.azurewebsites.net/'; //change to whatever path to website is later

export const ENDPOINTS = {
    customer: 'customer',
    customerLogin: 'Customer/signin',
    customerSignup: 'Customer/signup',
    employee: 'Employee',
    employeeLogin: 'Employee/signin',
    employeeUpdate: 'Employee/update',
    jobSearch: 'Employee/jobtitle',
    ride: 'Attraction',
    rideUpdate: 'Attraction/update'
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