package db

import (
	"errors"
  "github.com/cridenour/go-postgis"
)

type Point struct {
	Point postgis.Point
}

func (p *Point) Scan(src interface{}) error {
	switch val := src.(type) {
	case []byte:
		return p.Point.Scan(val)
	case string:
		return p.Point.Scan([]byte(val))
	}
	return errors.New("Point: unsupported type")
}
