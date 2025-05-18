package cors

import (
	"net/http"
	"slices"
	"strconv"
	"strings"
)

type Options struct {
	AllowedOrigins   []string
	AllowedMethods   []string
	AllowedHeaders   []string
	AllowCredentials bool
	MaxAge           int
}

func DefaultOptions() *Options {
	return &Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
		MaxAge:           3600,
	}
}

func Cors(options *Options) func(next http.Handler) http.Handler {
	if options == nil {
		options = DefaultOptions()
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")
			if origin != "" {
				allowed := false
				for _, o := range options.AllowedOrigins {
					if o == "*" || o == origin {
						allowed = true
						break
					}
				}
				if allowed {
					w.Header().Set("Access-Control-Allow-Origin", origin)
				}
			} else if slices.Contains(options.AllowedOrigins, "*") {
				w.Header().Set("Access-Control-Allow-Origin", "*")
			}

			if r.Method == "OPTIONS" {
				w.Header().Set("Access-Control-Allow-Methods", strings.Join(options.AllowedMethods, ", "))
				w.Header().Set("Access-Control-Allow-Headers", strings.Join(options.AllowedHeaders, ", "))
				if options.AllowCredentials {
					w.Header().Set("Access-Control-Allow-Credentials", "true")
				}
				if options.MaxAge > 0 {
					w.Header().Set("Access-Control-Max-Age", strconv.Itoa(options.MaxAge))
				}
				w.WriteHeader(http.StatusNoContent)
				return
			}

			if options.AllowCredentials {
				w.Header().Set("Access-Control-Allow-Credentials", "true")
			}

			next.ServeHTTP(w, r)
		})
	}
}
