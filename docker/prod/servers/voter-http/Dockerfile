# Build stage
FROM --platform=$BUILDPLATFORM golang:latest AS builder

ARG TARGETARCH
ARG TARGETOS

WORKDIR /app

# Copy go mod and sum files
COPY ./servers/go.mod ./servers/go.sum ./

# Download all dependencies
RUN go mod download

# Copy the entire project
COPY ./servers/cmd/ ./cmd/
COPY ./servers/internal/ ./internal/
COPY ./docker/ ./docker/
COPY ./.git ./.git

# Build the specific service
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -a -installsuffix cgo -o main ./cmd/voter-http

# Final stage
FROM --platform=$TARGETPLATFORM alpine:latest

# Required if you make https connection out of the container
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the pre-built binary file from the previous stage
COPY --from=builder /app/main .

# Command to run the executable
CMD ["./main"]