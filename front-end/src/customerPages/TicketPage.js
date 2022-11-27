import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useStateContext from '../hooks/useStateContext.js';
import useForm from '../hooks/useForm.js';
import '../css/ticketpage.css';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import {GiTicket} from 'react-icons/gi';
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';

//buy tickets page

const getFreshModel = () => ({
    tickets: 0,
    price: 0,
    date: "",
    email: "",
});

function Tickets() {
    const {context,setContext} = useStateContext();
    const navigate = useNavigate();
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const [price,setPrice] = useState({sub:0,disc:"0%",total:0});

    //connects to endpoint to buy ticket after submitting form
    const buyTickets = (e) => {
        e.preventDefault();
        if (validate())
        {
            const data = {tickets: values.tickets, price: price.total, date: values.date, customer_id: (context.login_id == "0") ? -1 : context.login_id};
            console.log(data);
            createAPIEndpoint(ENDPOINTS.tickets + '/' + data.date)
            .fetch()
            .then(respone => {
                console.log(typeof(respone.data[0].is_full));
                if (respone.data[0].is_full == 1) {
                    alert("The park is full on that day.");
                }
                else {
                    createAPIEndpoint(ENDPOINTS.tickets)
                    .post(data)
                    .then(respone => {
                        navigate('/');
                        alert("Successfully purchased tickets!");
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
                
            })
            .catch(error => {
                console.log(error);
                alert("The park is closed or full on that day.");
            })
        }       
    };

    //makes sure all input fields are valid
    const validate = () => {
        let temp = {};
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Not a valid email.";
        if (Number.isInteger(values.tickets)) {
            temp.tickets = values.tickets > 0 ? "" : "Select number of tickets to buy.";
        } else {
            temp.tickets = "Not a valid number.";
        }
        setErrors(temp);
        return Object.values(temp).every(x => x == "");
    };

    //gets date string for today
    const getToday = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    //gets date string for 4 months from today
    const getFourMonths = () => {
        let today = new Date();
        let future = new Date(today.setMonth(today.getMonth()+4));
        let dd = future.getDate();
        let mm = future.getMonth()+1;
        let yyyy = future.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        future = yyyy + '-' + mm + '-' + dd;
        return future;
    }

    //handles price change
    const handleInputChange2 = (e) => {
        handleInputChange(e);
        setPrice(getPrice(e.target.value));
    }

    //decrease number of tickets
    const decrementTicket = (e) => {
        if (values.tickets > 0) {
            setValues({...values,tickets:values.tickets-1});
        }
    }

    //increase number of tickets, possibly add max ticket limit?
    const incrementTicket = (e) => {
        setValues({...values,tickets:values.tickets+1});
    }

    //changes price whenever number of tickets changes
    useEffect(() => {
        setPrice(getPrice(values.tickets));
    },[values.tickets]);

    //calculates the price including discount
    const getPrice = (amount) => {
        let price = {sub: 0.00, disc: "0%", total: 0.00};
        if (amount < 1 || !amount) {
            return price;
        }
        else {
            price.sub = amount*20.00;
        }
        if (amount > 4)
        {
            price.disc = "-15% Group Pack Discount";
            price.total = (price.sub) - 0.15*(price.sub);
        }
        else {
            price.total = price.sub;
        }
        return price;
    }

    //if logged in then gets customers email
    if (context.account == "customer" && !values.email)
    {
        createAPIEndpoint(ENDPOINTS.customer+"/"+context.login_id)
        .fetch()
        .then(response => {
            setValues({...values, email : response.data[0].email});
        })
        .catch(errors => console.log(errors))
    }

    let today = getToday();
    let future = getFourMonths();
    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2><GiTicket/> Buy Tickets <GiTicket/></h2>
                <hr style={{border:'2px solid white'}}/>
                <h4>Tickets include full 1-day access to all park amenities including rides, shows, and attractions.</h4>
                <div className="deal">
                    <h5>Special Discount!!</h5>
                    <p>If you purchase 5 or more tickets, you'll get the group pack 15% discount! &#40;5 tickets will be $85 instead of $100!&#41;</p>
                </div>
                <br /><br />
                <div className='form-inner-box'>
                    <form name='buyTickets' id='buyTickets' method='post' onSubmit={buyTickets}>
                        <label>How many tickets?:</label><br />
                        <div className="ticket-box">
                            <button className="ticket-button" type="button" onClick={decrementTicket}><AiOutlineMinusCircle/></button>
                            <input className="ticket-input" id="ticket-input" type='number' value={values.tickets} name='tickets' onChange={handleInputChange2} min='0' required readOnly/>
                            <button className="ticket-button" type="button" onClick={incrementTicket}><AiOutlinePlusCircle/></button><br />
                            <p>{errors.tickets}</p><br />
                        </div>
                        <label>What day will you be visiting?:</label><br />
                        <input type='date' name='date' value={values.date} onChange={handleInputChange} min={today} max={future} required/><br />
                        <p>{errors.date}</p><br />
                        {!context.login_id &&
                        <>
                            <label>Email:</label><br />
                            <p>*Since you are not logged in, your ticket will be emailed to you.</p>
                            <input type='email' name='email' values={values.email} onChange={handleInputChange} size="30" required form='buyTickets'/><br />
                            <p>{errors.email}</p><br />
                        </>
                        }
                        {context.login_id != "" &&
                            <p>Your ticket will be emailed to {values.email}.</p>
                        }
                    </form>
                    <h3>Subtotal: ${price.sub}</h3>
                    <h5>Discount: {price.disc}</h5>
                    <h3>Total: ${price.total}</h3><br />
                </div>
                <button className='submit-button' type='submit' value='submit' form='buyTickets'>Purchase Tickets</button>
            </div>
        </div>
    );
}
    

export default Tickets;
