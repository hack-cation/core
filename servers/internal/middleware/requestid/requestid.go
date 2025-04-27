package requestid

import (
	"errors"
	"github.com/google/uuid"
	"net/http"
)

const (
	LogString = "request_id"
	Header    = "X-Request-ID"
)

func GetRequestID(r *http.Request) (string, error) {
	id := r.Header.Get(Header)
	if id == "" {
		return "", errors.New("no X-Request-FirmwareId header")
	}

	return id, nil
}

func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := uuid.New()
		r.Header.Set(Header, id.String())
		w.Header().Set(Header, id.String())

		next.ServeHTTP(w, r)
	})
}
