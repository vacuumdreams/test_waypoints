-- Enable PostGIS (as of 3.0 contains just geometry/geography)
CREATE EXTENSION IF NOT EXISTS postgis;
-- Enable Topology
CREATE EXTENSION IF NOT EXISTS postgis_topology;

CREATE TABLE IF NOT EXISTS waypoints(
id INT GENERATED ALWAYS AS IDENTITY,
user_id VARCHAR(120) NOT NULL,
name VARCHAR(120) NOT NULL,
coordinates GEOMETRY(Point, 4326) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS waypoints_order(
id INT GENERATED ALWAYS AS IDENTITY,
waypoint_id INT,
user_id VARCHAR(120) NOT NULL,
order_id SMALLINT NOT NULL,
PRIMARY KEY(id),
UNIQUE(waypoint_id),
CONSTRAINT fk_waypoints
   FOREIGN KEY(waypoint_id)
   REFERENCES waypoints(id)
   ON DELETE CASCADE
);
