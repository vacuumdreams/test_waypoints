package server

import (
	"encoding/json"
	"fmt"
	api "github.com/vacuumdreams/waypoints/api"
	db "github.com/vacuumdreams/waypoints/db"
	"net/http"
)

type Store struct {
	DB db.Database
}

var _ api.ServerInterface = (*Store)(nil)

func NewStore(db db.Database) api.ServerInterface {
	return Store{
		db,
	}
}

func sendError(w http.ResponseWriter, code int, message string) {
	err := api.Error{
		Message: &message,
	}
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(err)
}

func (s Store) List(w http.ResponseWriter, r *http.Request, user string) {
	list, err := s.DB.GetList(user)

	if err != nil {
		fmt.Println(fmt.Sprintf("Error retrieving waypoint list: %v", err))
		sendError(w, http.StatusInternalServerError, "Cannot get waypoint list")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(list)
}

func (s Store) Create(w http.ResponseWriter, r *http.Request, user string) {
	var newItem api.Waypoint
	if err := json.NewDecoder(r.Body).Decode(&newItem); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid waypoint format")
		return
	}

	result, err := s.DB.AddItem(user, newItem)

	if err != nil {
		fmt.Println(fmt.Sprintf("Error saving waypoint: %v", err))
		sendError(w, http.StatusInternalServerError, "Cannot save waypoint")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (s Store) Delete(w http.ResponseWriter, r *http.Request, user string, params api.DeleteParams) {
	err := s.DB.DeleteItem(user, params.Id)
	var result struct{}

	if err != nil {
		fmt.Println(fmt.Sprintf("Error deleting waypoint: %v", err))
		sendError(w, http.StatusInternalServerError, "Cannot delete waypoint")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (s Store) UpdateOrder(w http.ResponseWriter, r *http.Request, user string) {
	var newOrder []api.WaypointOrder
	if err := json.NewDecoder(r.Body).Decode(&newOrder); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid waypoint order format")
		return
	}

	result, err := s.DB.UpdateOrders(user, newOrder)

	if err != nil {
		fmt.Println(fmt.Sprintf("Error updating waypoint orders: %v", err))
		sendError(w, http.StatusInternalServerError, "Cannot update waypoint orders")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}
