-- query to find specific entry date where it's all october.
SELECT * FROM amusement_park.entry WHERE monthname(entry_date) = 'October';
