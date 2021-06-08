package server

import (
  "fmt"
	"encoding/json"
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

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(list)
}

func (s Store) Create(w http.ResponseWriter, r *http.Request, user string) {
  var newItem api.Waypoint
	if err := json.NewDecoder(r.Body).Decode(&newItem); err != nil {
		sendError(w, http.StatusBadRequest, "Invalid waypoint format")
		return
	}

	item, err := s.DB.AddItem(user, newItem)

  if err != nil {
    fmt.Println(fmt.Sprintf("Error saving waypoint: %v", err))
    sendError(w, http.StatusInternalServerError, "Cannot save waypoint")
    return
  }

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(item)
}

func (s Store) Delete(w http.ResponseWriter, r *http.Request, user string) {
	result := "result"
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

func (s Store) UpdateOrder(w http.ResponseWriter, r *http.Request, user string) {
	result := "result"
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}
