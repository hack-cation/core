package api

import (
	"api.hackcation.dev/internal/validator"
	"github.com/google/uuid"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

func ReadStringPath(r *http.Request, key string, defaultValue string) string {
	s := r.PathValue(key)

	if s == "" {
		return defaultValue
	}

	return s
}

func ReadIntPath(r *http.Request, key string, defaultValue int, v *validator.Validator) int {
	s := r.PathValue(key)

	if s == "" {
		return defaultValue
	}

	i, err := strconv.Atoi(s)
	if err != nil {
		v.AddError(key, "must be an integer value")
		return defaultValue
	}

	return i
}

func ReadIdPath(r *http.Request, key string, v *validator.Validator) int {
	id := ReadIntPath(r, key, 0, v)
	if id <= 0 {
		v.AddError(key, "must be a positive integer value greater than 0")
	}
	return id
}

func ReadUUIDPath(r *http.Request, key string, v *validator.Validator) uuid.UUID {
	s := ReadStringPath(r, key, "")
	if s == "" {
		v.AddError(key, "must be provided")
		return uuid.Nil
	}

	id, err := uuid.Parse(s)
	if err != nil {
		v.AddError(key, "must be a valid UUID")
		return uuid.Nil
	}
	if id == uuid.Nil {
		v.AddError(key, "must be a valid UUID")
		return uuid.Nil
	}

	return id
}

func ReadCSVQuery(values url.Values, key string, defaultValue []string) ([]string, bool) {
	csv := values.Get(key)

	if csv == "" {
		return defaultValue, false
	}

	return strings.Split(csv, ","), true
}

func ReadCSVInt(values url.Values, key string, defaultValue []int, v *validator.Validator) ([]int, bool) {
	strs, exists := ReadCSVQuery(values, key, nil)
	if !exists {
		return defaultValue, false
	}

	ints := make([]int, len(strs))
	for i, str := range strs {
		id, err := strconv.Atoi(str)
		if err != nil {
			v.AddError(key, "must contain only integer values")
			return defaultValue, true
		}
		ints[i] = id
	}
	return ints, true
}

func ReadStringQuery(values url.Values, key string, defaultValue string) (string, bool) {
	s := values.Get(key)

	if s == "" {
		return defaultValue, false
	}

	return s, true
}

func ReadIntQuery(values url.Values, key string, defaultValue int, v *validator.Validator) (int, bool) {
	s := values.Get(key)

	if s == "" {
		return defaultValue, false
	}

	i, err := strconv.Atoi(s)
	if err != nil {
		v.AddError(key, "must be an integer value")
		return defaultValue, true
	}

	return i, true
}
