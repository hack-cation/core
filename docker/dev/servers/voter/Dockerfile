FROM golang:latest

WORKDIR /app

# Clear Go module cache and install Air
RUN go clean -modcache && \
    go install github.com/air-verse/air@latest

# Copy go mod and sum files
COPY ./servers/go.mod ./servers/go.sum ./

# Download all dependencies
RUN go mod download

# Copy the entire project
COPY ./servers/cmd/ ./cmd/
COPY ./servers/internal/ ./internal/
COPY ./docker/ ./docker/

# Copy the Air configuration file directly to the root
COPY ./docker/dev/servers/voter/.air.toml ./.air.toml

# Command to run Air for hot reloading
CMD ["air", "-c", "./.air.toml"]
