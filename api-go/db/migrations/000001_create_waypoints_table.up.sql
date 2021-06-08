-- Enable PostGIS (as of 3.0 contains just geometry/geography)
CREATE EXTENSION postgis;
-- enable raster support (for 3+)
CREATE EXTENSION postgis_raster;
-- Enable Topology
CREATE EXTENSION postgis_topology;

CREATE TABLE IF NOT EXISTS waypoints(
id SERIAL PRIMARY KEY,
user_id VARCHAR(120) NOT NULL,
name VARCHAR(120) NOT NULL,
coordinates GEOMETRY(Point, 4326) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waypoints_order(
waypoint_id SERIAL PRIMARY KEY,
user_id VARCHAR(120) NOT NULL,
order_id SMALLINT NOT NULL
);
