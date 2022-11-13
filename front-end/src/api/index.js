import axios from 'axios';

//connects front end to back end, change if needed

export const BASE_URL = 'https://cosc3380-park.azurewebsites.net/'; //change to whatever path to website is later

export const ENDPOINTS = {
    customer: 'customer', ///{id}
    customerLogin: 'Customer/signin',
    customerSignup: 'Customer/signup',
    employee: 'Employee', ///{id}
    employeeLogin: 'Employee/signin',
    employeeUpdate: 'Employee/update',
    jobSearch: 'Employee/role/', //{title}
    employeePosition: 'Employee/position',
    attraction: 'Attraction',
    rides: 'attraction/rides',
    shops: 'attraction/shops',
    ridesLastMonth: 'attraction/ridereportlastmonth',
    shopsLastMonth: 'attraction/shopreportlastmonth',
    attractionUpdate: 'Attraction/update',
    tickets: 'Tickets',
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