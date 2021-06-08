package db

import (
	"context"
	api "github.com/vacuumdreams/waypoints/api"
)

func (db Database) GetList(userId string) ([]api.SavedWaypoint, error) {
	list := make([]api.SavedWaypoint, 0, 10)
	query := `
  SELECT id, waypoints.user_id, name, coordinates, order_id AS order
  FROM waypoints INNER JOIN waypoints_order
  ON waypoints.user_id = waypoints_order.user_id
  WHERE waypoints.user_id = $1 AND id = waypoint_id;
  `

	rows, err := db.Conn.Query(context.Background(), query, userId)
	if err != nil {
		return list, err
	}
	for rows.Next() {
		var item api.SavedWaypoint
		err := rows.Scan(&item.Id, &item.Name, &item.Order, &item.Coordinates)
		if err != nil {
			return list, err
		}
		list = append(list, item)
	}
	return list, nil
}

func (db Database) AddItem(userId string, item api.Waypoint) (*api.SavedWaypoint, error) {
	result := &api.SavedWaypoint{}
  var coordinates Point

	query := `
  WITH op1 AS (
    INSERT INTO waypoints (user_id, name, coordinates, created_at)
    VALUES ($1, $2, ST_SetSRID(ST_Point($3, $4), 4326), NOW())
    RETURNING id, name, coordinates
  ), op2 AS (
    SELECT COALESCE((SELECT MAX(order_id) FROM waypoints_order WHERE user_id = $1), 0) + 1 AS order
  ), op3 AS (
    INSERT INTO waypoints_order (waypoint_id, user_id, order_id)
    VALUES ((SELECT op1.id FROM op1), $1, (SELECT op2.order FROM op2))
    RETURNING order_id AS order
  )
  SELECT * FROM op1, op3;
  `

	err := db.Conn.QueryRow(context.Background(), query, userId, item.Name, item.Coordinates.X, item.Coordinates.Y).Scan(&result.Id, &result.Name, &coordinates, &result.Order)
  result.Coordinates = coordinates.Point

	return result, err
}

func (db Database) DeleteItem(itemId int) error {
	query := `
    DELETE FROM waypoints WHERE id = $1
    DELETE FROM waypoints_order WHERE waypoint_id = $1;
    `
	_, err := db.Conn.Exec(context.Background(), query, itemId)
	return err
}

// func (db Database) UpdateOrders(userId string, orders []api.WaypointOrder) ([]api.SavedWaypoint, error) {
// 	query := `UPDATE items SET name=$1, description=$2 WHERE id=$3 RETURNING id, name, description, created_at;`
// 	err := db.Conn.QueryRow(query, itemData.Name, itemData.Description, itemId).Scan(&item.ID, &item.Name, &item.Description, &item.CreatedAt)
// 	if err != nil {
// 		if err == sql.ErrNoRows {
// 			return item, ErrNoMatch
// 		}
// 		return item, err
// 	}
// 	return item, nil
// }
