import axios from 'axios';

//connects front end to back end, change if needed

export const BASE_URL = 'https://cosc3380-park.azurewebsites.net/';

export const ENDPOINTS = {
    customer: 'customer', //'/{id}' returns list of customers or specified customer
    customerLogin: 'Customer/signin', //signs in a customer
    customerSignup: 'Customer/signup', //creates new customer account
    customerTickets: 'Customer/tickets/', //'{id}' not in backend yet, returns ticket_bought of that customer
    employee: 'Employee', //'/{id}' returns list of employees or specified employee
    employeeLogin: 'Employee/signin', //signs in an employee
    employeeUpdate: 'Employee/update', //updates an employee
    jobSearch: 'Employee/role/', //'{title}' returns employees by job title
    employeePosition: 'Employee/position',
    attraction: 'Attraction', //returns list of attractions
    rides: 'attraction/rides', //returns list of rides
    shops: 'attraction/shops', //returns list of shops
    ridesPastMonth: 'attraction/ridereportpastmonth',
    shopsPastMonth: 'attraction/shopreportpastmonth',
    attractionUpdate: 'Attraction/update', // not in backend yet, updates an attraction
    breakdowns: 'Attraction/breakdown', //'/{month}/{year}' returns list of breakdowns
    breakdownUpdate: 'attraction/breakdown/update', //not in backend yet, resolves a breakdown
    tickets: 'Tickets', // adds new ticket
    overallReport: 'Stats', // not in backend yet, returns overall park report
    monthReport: 'Entry/', //'{month}/{year}' returns month report
    dayReport: 'Date', //'/{date}' not in backend yet, returns list of dates or specified date
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