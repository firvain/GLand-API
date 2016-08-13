SELECT
  ST_AsGeoJSON(estates.the_geom) as geom,
  estates.gid,
  estates.category_id,
  categories.description,
  estates.level_number,
  estates.lot_size,
  estates.window_screens,
  estates.frames_type,
  estates.floors_type,
  estates.road_type,
  estates.construction_year,
  estates.living_area,
  estates.bedrooms,
  estates.kitchens,
  estates.living_rooms,
  estates.bathrooms,
  json_build_object(
    'parking', estates.parking,
    'furnished', estates.furnished,
    'has_storage', estates.has_storage,
    'elevator', estates.elevator,
    'balcony', estates.balcony,
    'corner', estates.corner,
    'airy', estates.airy,
    'double_glass', estates.double_glass,
    'satellite', estates.satellite,
    'solar_water_heating', estates.solar_water_heating,
    'has_view', estates.has_view,
    'garden', estates.garden,
    'air_condition', estates.air_condition,
    'shared_expenses', estates.shared_expenses,
    'night_power', estates.night_power,
    'pool', estates.pool,
    'playroom', estates.playroom,
    'secure_door', estates.secure_door,
    'penthouse', estates.penthouse,
    'attic', estates.attic,
    'alarm', estates.alarm,
    'awning', estates.awning,
    'fireplace', estates.fireplace,
    'heating_system', estates.heating_system
  ) AS amenities,
  json_build_object(
    'street_name', estates.street_name,
    'street_number', estates.street_number,
    'ps_code', estates.ps_code,
    'city', estates.city,
    'country', estates.country
  ) AS address,
  json_build_object(
    'id', listings.id,
    'sale', listings.sale,
    'start_date', listings.start_date,
    'end_end', listings.end_end,
    'short', listings.short,
    'pets', listings.pets,
    'price', listings.price
  ) AS listing
FROM
  ${schema~}.listings
  INNER JOIN ${schema~}.estates ON (${schema~}.listings.estates_gid = ${schema~}.estates.gid)
  INNER JOIN ${schema~}.categories ON (${schema~}.estates.category_id = ${schema~}.categories.id)
