FROM golang:1.14.6-alpine3.12 as builder
COPY go.mod go.sum /go/src/github.com/vacuumdreams/waypoints/
WORKDIR /go/src/github.com/vacuumdreams/waypoints
RUN go mod download
COPY . /go/src/github.com/vacuumdreams/waypoints
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o build/waypoints github.com/vacuumdreams/waypoints

FROM alpine as runner
RUN apk add --no-cache ca-certificates && update-ca-certificates
COPY --from=builder /go/src/github.com/vacuumdreams/waypoints/build/waypoints /usr/bin/waypoints
EXPOSE 8001 8001
ENTRYPOINT ["/usr/bin/waypoints"]
