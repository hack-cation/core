package database

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type ConnectionInfo struct {
	User       string
	Password   string
	Host       string
	Port       int
	DbName     string
	SslEnabled bool
}

type Config struct {
	dsn          string
	driver       string
	maxOpenConns int
	maxIdleConns int
	maxIdleTime  time.Duration
}

type Db struct {
	*sql.DB
}

type ConfigOption func(*Config)

// New returns a new Config, ready to connect. Since I use Postgres 99% of the time, the method currently only creates
// a Postgres DSN from the provided ConnectionInfo.
func New(info ConnectionInfo, options ...ConfigOption) *Config {
	var dsn string

	if info.SslEnabled {
		dsn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=require",
			info.Host, info.Port, info.User, info.Password, info.DbName)
	} else {
		dsn = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
			info.Host, info.Port, info.User, info.Password, info.DbName)
	}

	config := &Config{dsn: dsn, driver: "pgx"}

	for _, option := range options {
		option(config)
	}

	return config
}

func WithMaxOpenConns(maxOpenConns int) ConfigOption {
	return func(config *Config) {
		config.maxOpenConns = maxOpenConns
	}
}

func WithMaxIdleConns(maxIdleConns int) ConfigOption {
	return func(config *Config) {
		config.maxIdleConns = maxIdleConns
	}
}

func WithMaxIdleTime(maxIdleTime time.Duration) ConfigOption {
	return func(config *Config) {
		config.maxIdleTime = maxIdleTime
	}
}

func WithDriver(driver string) ConfigOption {
	return func(config *Config) {
		config.driver = driver
	}
}

// OpenDB opens a connection to the database and pings it to ensure connectivity
func (c *Config) OpenDB(ctx context.Context) (db *Db, err error) {
	sqlDb, err := sql.Open(c.driver, c.dsn)
	if err != nil {
		return nil, err
	}

	if c.maxOpenConns > 0 {
		sqlDb.SetMaxOpenConns(c.maxOpenConns)
	}
	if c.maxIdleConns > 0 {
		sqlDb.SetMaxIdleConns(c.maxIdleConns)
	}
	if c.maxIdleTime > 0 {
		sqlDb.SetConnMaxIdleTime(c.maxIdleTime)
	}

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	err = sqlDb.PingContext(ctx)
	if err != nil {
		defer func() {
			closeErr := sqlDb.Close()
			if closeErr != nil {
				err = fmt.Errorf("%s, %s", err, closeErr)
			}
		}()
		return nil, err
	}

	return &Db{sqlDb}, nil
}
