SELECT
  ST_AsGeoJSON(${schema~}.estates.the_geom) as geom,
  ${schema~}.estates.gid,
  ${schema~}.estates.category_id,
  ${schema~}.categories.description,
  ${schema~}.estates.level_number,
  ${schema~}.estates.lot_size,
  ${schema~}.estates.window_screens,
  ${schema~}.estates.frames_type,
  ${schema~}.estates.floors_type,
  ${schema~}.estates.road_type,
  json_build_object(
    'living_area', ${schema~}.estates.living_area,
    'construction_year', ${schema~}.estates.construction_year,
    'bedrooms', ${schema~}.estates.bedrooms,
    'kitchens', ${schema~}.estates.kitchens,
    'living_rooms', ${schema~}.estates.living_rooms,
    'bathrooms', ${schema~}.estates.bathrooms,
    'parking', ${schema~}.estates.parking,
    'furnished', ${schema~}.estates.furnished,
    'has_storage', ${schema~}.estates.has_storage,
    'elevator', ${schema~}.estates.elevator,
    'balcony', ${schema~}.estates.balcony,
    'corner', ${schema~}.estates.corner,
    'airy', ${schema~}.estates.airy,
    'double_glass', ${schema~}.estates.double_glass,
    'satellite', ${schema~}.estates.satellite,
    'solar_water_heating', ${schema~}.estates.solar_water_heating,
    'has_view', ${schema~}.estates.has_view,
    'garden', ${schema~}.estates.garden,
    'air_condition', ${schema~}.estates.air_condition,
    'shared_expenses', ${schema~}.estates.shared_expenses,
    'night_power', ${schema~}.estates.night_power,
    'pool', ${schema~}.estates.pool,
    'playroom', ${schema~}.estates.playroom,
    'secure_door', ${schema~}.estates.secure_door,
    'penthouse', ${schema~}.estates.penthouse,
    'attic', ${schema~}.estates.attic,
    'alarm', ${schema~}.estates.alarm,
    'awning', ${schema~}.estates.awning,
    'fireplace', ${schema~}.estates.fireplace,
    'heating_system', ${schema~}.estates.heating_system
  ) AS amenities,
  json_build_object(
    'street_name', ${schema~}.estates.street_name,
    'street_number', ${schema~}.estates.street_number,
    'ps_code', ${schema~}.estates.ps_code,
    'city', ${schema~}.estates.city,
    'country', ${schema~}.estates.country
  ) AS address,
  json_build_object(
    'id', ${schema~}.listings.id,
    'sale', ${schema~}.listings.sale,
    'start_date', ${schema~}.listings.start_date,
    'end_end', ${schema~}.listings.end_end,
    'short', ${schema~}.listings.short,
    'pets', ${schema~}.listings.pets,
    'price', ${schema~}.listings.price
  ) AS listing

FROM
  ${schema~}.listings
  INNER JOIN ${schema~}.estates ON (${schema~}.listings.estates_gid = ${schema~}.estates.gid)
  INNER JOIN ${schema~}.categories ON (${schema~}.estates.category_id = ${schema~}.categories.id)

  WHERE
    ${schema~}.estates.gid = ${gid}
