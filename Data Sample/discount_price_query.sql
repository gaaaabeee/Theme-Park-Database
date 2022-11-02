SELECT * FROM amusement_park.customer;

SELECT *, tickets_bought * 20 AS tickets_prices, IF(tickets_bought >=5, tickets_bought * 20 - 15, tickets_bought * 20) as discount_price
FROM customer
WHERE tickets_bought >= 5;