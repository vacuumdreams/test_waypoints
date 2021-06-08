package db

import (
    "context"
    api "github.com/vacuumdreams/waypoints/api"
)

func (db Database) GetList(userId string) ([]api.SavedWaypoint, error) {
    list := make([]api.SavedWaypoint, 1, 10)
    query := "SELECT id, user_id, name, coordinates, order_id AS order FROM waypoints, waypoints_order WHERE user_id = $1 AND id = waypoint_id;"

    rows, err := db.Conn.Query(context.Background(), query, userId)
    if err != nil {
        return list, err
    }
    for rows.Next() {
        var item api.SavedWaypoint
        err := rows.Scan(&item.Id, &item.Name, item.Order, &item.Coordinates)
        if err != nil {
            return list, err
        }
        list = append(list, item)
    }
    return list, nil
}
