INSERT INTO ${schema~}.listings(
property_gid,
sale,
start_date,
end_date,
short,
pets )
VALUES (
${property_gid},
${sale},
${start_date},
${end_date},
${short},
${pets} )
 RETURNING *
