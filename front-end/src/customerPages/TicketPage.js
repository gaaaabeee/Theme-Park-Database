import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useStateContext from '../hooks/useStateContext.js';
import useForm from '../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../api';

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

    //ADD API ENDPOINT CONNECTION
    const buyTickets = (e) => {
        e.preventDefault();
        //if park is open on purchase date (and email is valid if not logged in)
            //add ticket to tickets database
                //then update tickets bought for customer
                navigate('/');
                alert("Successfully purchased tickets!");
    };

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

    const handleInputChange2 = (e) => {
        handleInputChange(e);
        setPrice(getPrice(e.target.value));
    }

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

    if (context.account == "customer" && !values.email)
    {
        createAPIEndpoint(ENDPOINTS.customer+"/"+context.login_id)
        .fetch()
        .then(response => {
            setValues({...values, email : response.data});
        })
        .catch(errors => console.log(errors))
    }
    let today = getToday();
    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Buy Tickets</h2>
                <hr style={{border:'2px solid white'}}/>
                <h4>Tickets include full 1-day access to all park amenities including rides, shows, and attractions.</h4>
                <div className="deal">
                    <h5>Special Discount:</h5>
                    <p>If you purchase 5 or more tickets, you'll get the group pack 15% discount! &#40;5 tickets will be $85 instead of $100!&#41;</p>
                </div>
                <br /><br />
                <div className='form-inner-box'>
                    <form name='buyTickets' id='buyTickets' method='post' onSubmit={buyTickets}>
                        <label>Tickets:</label><br />
                        <input type='number' name='tickets' id='ticketsInput' onChange={handleInputChange2} min='0' required /><br />
                        <p>{errors.tickets}</p><br />
                        <label>Purchase Date:</label><br />
                        <input type='date' name='purchaseDate' id='purchaseDate' onChange={handleInputChange} min={today} required /><br />
                        <p>{errors.date}</p><br />
                        {!context.login_id &&
                        <>
                            <label>Email:</label><br />
                            <p>*Since you are not logged in, your ticket will be emailed to you.</p>
                            <input type='email' name='email' onChange={handleInputChange} size="30" required form='buyTickets'/><br />
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
