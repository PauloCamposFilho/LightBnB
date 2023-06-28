SELECT
   reservations.id
  ,properties.title
  ,reservations.start_date
  ,properties.cost_per_night
  ,AVG(property_reviews.rating) as average_rating
FROM
  properties
  JOIN reservations on reservations.property_id = properties.id
  JOIN property_reviews on property_reviews.property_id = properties.id
WHERE
  reservations.guest_id = 4
GROUP BY
  reservations.id, properties.id
ORDER BY
  reservations.start_date
LIMIT 10;