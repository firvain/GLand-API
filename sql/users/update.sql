UPDATE ONLY ${schema~}.users
SET (
${columns^} )
= (
${values^} )
WHERE id = ${id}
 RETURNING *
