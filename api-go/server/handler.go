package server

import (
  "fmt"
  "net/http"
  "encoding/json"
  db "github.com/vacuumdreams/waypoints/db"
  api "github.com/vacuumdreams/waypoints/api"
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

func (s Store) List(w http.ResponseWriter, r *http.Request, user string) {
  list, err := s.DB.GetList(user)

  if err != nil {
      fmt.Println(fmt.Sprintf("Could not get waypoints for user id `%s`: %s", user, err))
      w.WriteHeader(http.StatusBadRequest)
      json.NewEncoder(w).Encode(err)
      return
  }

  w.WriteHeader(http.StatusOK)
  json.NewEncoder(w).Encode(list)
}

func (s Store) Create(w http.ResponseWriter, r *http.Request, user string) {
  result := "result"
  w.WriteHeader(http.StatusOK)
  json.NewEncoder(w).Encode(result)
}

func (s Store) UpdateOrder(w http.ResponseWriter, r *http.Request, user string) {
  result := "result"
  w.WriteHeader(http.StatusOK)
  json.NewEncoder(w).Encode(result)
}
