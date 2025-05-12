package api

import (
	"api.hackcation.dev/internal/middleware/requestid"
	"fmt"
	"log/slog"
	"net/http"
)

type MultiErrors interface {
	Errors() map[string]string
}

func logError(r *http.Request, logger *slog.Logger, err error) {
	var (
		method    = r.Method
		uri       = r.URL.RequestURI()
		requestId = r.Header.Get(requestid.Header)
	)

	logger.Error(
		"server error",
		requestid.LogString, requestId,
		"error", err.Error(),
		"method", method,
		"uri", uri,
	)
}

func ErrorResponse(
	w http.ResponseWriter,
	r *http.Request,
	logger *slog.Logger,
	status int,
	message any,
) {
	env := Envelope{"error": message}

	err := WriteJson(w, status, env, nil)
	if err != nil {
		logError(r, logger, err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}

func ServerErrorResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger, err error) {
	logError(r, logger, err)

	message := "the server encountered a problem and could not process your request"
	ErrorResponse(w, r, logger, http.StatusInternalServerError, message)
}

func MethodNotAllowedResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := fmt.Sprintf("the %s method is not supported for this resource", r.Method)
	ErrorResponse(w, r, logger, http.StatusMethodNotAllowed, message)
}

func NotFoundResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := "the requested resource could not be found"
	ErrorResponse(w, r, logger, http.StatusNotFound, message)
}

func BadRequestResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger, err error) {
	if ep, ok := err.(MultiErrors); ok {
		ErrorResponse(w, r, logger, http.StatusBadRequest, ep.Errors())
	} else {
		ErrorResponse(w, r, logger, http.StatusBadRequest, err.Error())
	}
}

func FailedValidationResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger, errors map[string]string) {
	ErrorResponse(w, r, logger, http.StatusUnprocessableEntity, errors)
}

func EditConflictResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := "unable to update record due to an edit conflict, please try again"
	ErrorResponse(w, r, logger, http.StatusConflict, message)
}

func VersionConflictResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := "unable to update record due to a version conflict, please try again"
	ErrorResponse(w, r, logger, http.StatusConflict, message)
}

func DependentResourcesResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := "the resource you're trying to delete has dependents"
	ErrorResponse(w, r, logger, http.StatusConflict, message)
}

func UniqueViolationResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger, field string) {
	message := fmt.Sprintf("the resource you're trying to create already exists: %s", field)
	ErrorResponse(w, r, logger, http.StatusConflict, message)
}

func ConstraintViolationResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger, field string) {
	message := fmt.Sprintf("the resource you're trying to create violates a constraint: %s", field)
	ErrorResponse(w, r, logger, http.StatusUnprocessableEntity, message)
}

func UnprocessableEntityResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger, err error) {
	ErrorResponse(w, r, logger, http.StatusUnprocessableEntity, err.Error())
}

func UnauthorizedResponse(w http.ResponseWriter, r *http.Request, message string, logger *slog.Logger) {
	ErrorResponse(w, r, logger, http.StatusUnauthorized, message)
}

func ForbiddenResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := "you are not authorized to access this resource"
	ErrorResponse(w, r, logger, http.StatusForbidden, message)
}

func TimeoutResponse(w http.ResponseWriter, r *http.Request, logger *slog.Logger) {
	message := "the request timed out"
	ErrorResponse(w, r, logger, http.StatusGatewayTimeout, message)
}
