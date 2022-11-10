import React, {useState, useEffect} from 'react';
import '../css/profilepage.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';

const getFreshFormModel = () => ({
    fname: "",
    lname: "",
    height: "",
    email: "",
    dob: ""
});

function Profile() {
    const {context,setContext} = useStateContext();
    const [account,setAccount] = useState({});

    useEffect(() => {
        if (context.account == "customer") {
            createAPIEndpoint(ENDPOINTS.customer)
            .fetch()
            .then(response => {
                let user = response.data.find((item) => (item.customer_id === context.login_id));
                setAccount({
                    customer_id: user.customer_id,
                    fname: user.fname,
                    lname: user.lname,
                    height: user.height,
                    dob: user.dob,
                    email: user.email,
                    password: user.password,
                    tickets: user.tickets_bought
                });
            })
            .catch(errors => console.log(errors))
        }
        else if (context.account == "employee") {
            createAPIEndpoint(ENDPOINTS.employee)
            .fetch()
            .then(response => {
                let user = response.data.find((item) => (item.employee_id === context.login_id));
                setAccount({
                    employee_id: user.employee_id,
                    fname: user.fname,
                    lname: user.lname,
                    job_title: user.job_title,
                    supervisor_id: user.supervisor_id,
                    dob: user.dob,
                    username: user.username,
                    password: user.password,
                });
            })
            .catch(errors => console.log(errors))
        }
    },[]);
    console.log(account);
    if (context.account == "employee") {
        return (
            <div>
            <div className="profile-name">
                <h1>{account.fname} {account.lname}</h1>
            </div>
            <div className="profile-contents">
                <div className="profile-info">
                    <h3>Account Information:</h3>
                    <br />
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Employee ID:</div>
                        <div className="profile-grid-item2">{account.employee_id}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">First Name:</div>
                        <div className="profile-grid-item2">{account.fname}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Last Name:</div>
                        <div className="profile-grid-item2">{account.lname}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Job Title:</div>
                        <div className="profile-grid-item2">{account.job_title}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Date of Birth:</div>
                        <div className="profile-grid-item2">{new Date(account.dob).toLocaleDateString()}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Supervisor ID:</div>
                        <div className="profile-grid-item2">{account.supervisor_id}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Email:</div>
                        <div className="profile-grid-item2">{account.username}</div>
                    </div>
                    <hr className="profile-line-break" />
                </div>
                <ChangeProfile />
            </div>
        </div>
        );
    }
    return (
        <div>
            <div className="profile-name">
                <h1>{account.fname} {account.lname}</h1>
            </div>
            <div className="profile-contents">
                <div className="profile-info">
                    <h3>Account Information:</h3>
                    <br />
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Account ID:</div>
                        <div className="profile-grid-item2">{account.customer_id}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">First Name:</div>
                        <div className="profile-grid-item2">{account.fname}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Last Name:</div>
                        <div className="profile-grid-item2">{account.lname}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Height:</div>
                        <div className="profile-grid-item2">{account.height}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Date of Birth:</div>
                        <div className="profile-grid-item2">{new Date(account.dob).toLocaleDateString()}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Email:</div>
                        <div className="profile-grid-item2">{account.email}</div>
                    </div>
                    <hr className="profile-line-break" />
                    <div className="profile-grid">
                        <div className="profile-grid-item1">Tickets Purchased:</div>
                        <div className="profile-grid-item2">{account.tickets}</div>
                    </div>
                    <hr className="profile-line-break" />
                </div>
                <ViewTickets />
                <ChangeProfile />
            </div>
        </div>
    );
}

function ViewTickets() {
    return (
        <div className="profile-info">View Purchased Tickets</div>
    );
}

function ChangeProfile() {
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshFormModel);
    return (
        <div className="profile-info">Change Profile Info</div>
    );
}

export default Profile;