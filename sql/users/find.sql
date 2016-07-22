SELECT
  *
FROM ${schema~}.users
WHERE
  id = $1
