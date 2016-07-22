DELETE
FROM ${schema~}.users
WHERE
  id = $1
RETURNING
  id,
  first_name AS firstName,
  last_name AS lastName;
