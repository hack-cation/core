package database

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/jackc/pgx/v5/pgconn"
)

var (
	ErrRecordNotFound        = errors.New("record not found")
	ErrEditConflict          = errors.New("edit conflict")
	ErrForeignKeyViolation   = errors.New("foreign key violation")
	ErrVersionMismatch       = errors.New("version of entity does not match version in database")
	ErrResourceHasDependents = errors.New("resource has dependents")
	ErrUniqueViolation       = errors.New("unique violation")
	ErrDatabaseDeadlock      = errors.New("database deadlock detected")
	ErrDatabaseShutdown      = errors.New("database is shutting down")
	ErrQueryCanceled         = errors.New("query canceled")
	ErrSyntaxError           = errors.New("syntax error in query")
	ErrConnectionFailure     = errors.New("database connection failure")
	ErrTransactionCompleted  = errors.New("transaction has already been committed or rolled back")
	ErrConnectionClosed      = errors.New("database connection is closed")
)

const (
	PsqlUniqueViolation      = "23505"
	PsqlForeignKeyViolation  = "23503"
	PsqlSerializationFailure = "40001"
	PsqlCheckFailure         = "23514"
	PsqlDeadlockDetected     = "40P01"
	PsqlAdminShutdown        = "57P01"
	PsqlQueryCanceled        = "57014"
	PsqlSyntaxError          = "42601"
	PsqlConnectionFailure    = "08006"
)

type ErrNilReturned string

func (e ErrNilReturned) Error() string {
	return fmt.Sprintf("%s was returned as nil", string(e))
}

func CheckPostgresError(err error) error {
	if err == nil {
		return nil
	}

	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		switch pgErr.Code {
		case PsqlUniqueViolation:
			return ErrUniqueViolation
		case PsqlForeignKeyViolation:
			return ErrForeignKeyViolation
		case PsqlSerializationFailure:
			return ErrEditConflict
		case PsqlCheckFailure:
			return ErrResourceHasDependents
		case PsqlDeadlockDetected:
			return fmt.Errorf("%w: %v", ErrDatabaseDeadlock, err)
		case PsqlAdminShutdown:
			return fmt.Errorf("%w: %v", ErrDatabaseShutdown, err)
		case PsqlQueryCanceled:
			return fmt.Errorf("%w: %v", ErrQueryCanceled, err)
		case PsqlSyntaxError:
			return fmt.Errorf("%w: %v", ErrSyntaxError, err)
		case PsqlConnectionFailure:
			return fmt.Errorf("%w: %v", ErrConnectionFailure, err)
		}
	}

	switch {
	case errors.Is(err, sql.ErrNoRows):
		return ErrRecordNotFound
	case errors.Is(err, sql.ErrTxDone):
		return fmt.Errorf("%w: %v", ErrTransactionCompleted, err)
	case errors.Is(err, sql.ErrConnDone):
		return fmt.Errorf("%w: %v", ErrConnectionClosed, err)
	}

	return err
}
