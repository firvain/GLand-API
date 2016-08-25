WITH isochrone as (
SELECT ST_asGeojson(pgr_pointsAsPolygon('SELECT * from calculate_isochrone_links($$cyprus_routing$$, ${time}, $$false$$, $$false$$, $$the_geom$$, $$walk$$, ${x}, ${y})', 1)) as geometry
)
SELECT 'Feature' As type,
json_object('{time, ${time}}') as properties,
geometry::json from isochrone As geometry
