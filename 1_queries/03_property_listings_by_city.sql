SELECT
   properties.id
  ,properties.title
  ,properties.cost_per_night
  ,AVG(property_reviews.rating) as rating
FROM
  properties
  LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE
  lower(properties.city) like lower('%ancouver%')
GROUP BY
  properties.id
HAVING
  avg(property_reviews.rating) >= 4
ORDER BY
  properties.cost_per_night ASC
LIMIT 10;
