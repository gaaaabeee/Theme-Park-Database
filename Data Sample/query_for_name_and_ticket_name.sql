SELECT concat (fname," ", lname) AS full_name, ticket_id, 
customer.customer_id AS cust_id, ticket_name, price
FROM customer
JOIN ticket ON ticket.customer_id = customer.customer_id