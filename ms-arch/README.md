# MS-ARCH README

Last Edited: Wed, 16 Apr 2025 @ 8:47 AM 

This directory contains a reference architecture demonstrating how
microservices are built and how docker is used to run those
microservices in containers.

## UPDATES

The following updates have been made in this reference implementation:

- All services have been dockerized.
- A docker-compose file has been added to automate the docker process.

## SERVICES

The following reference services exist in this architecture:

- `registry`: a service to register the URLs of other services.
- `api-gateway`: a service to forward requests to other services.
- `service-a`: a reference service (js/node/express)
- `service-b`: a reference service (js/node/express)
- `service-c`: a reference service (python/fastapi)
- `service-d`: a reference service (js/node/express)

To communicate to this version of the system, we have two endpoints
that are exposed:

- `api-gateway/a`: this requires us to send a message in a specific
format which is `{ message: "the message..." }`.
- `api-gateway/b`: this requires us to send a message in a specific
format which is `{ message: "the message..." }`.

## DOCKER COMPOSE

In this version we added a `docker-compose.yml` configuration file.
This allows us to build and run all of our services with a single
command. Here are the useful commands you need to start and stop all
containers:

```bash
#   docker compose up          - "runs" the entire system
#   docker compose up --build  - force a build and "runs" system
#   docker compose up -d       - "runs" system in detacted mode
#   docker compose down        - "closes" the entire system and deletes everything
#   docker compose stop        - stop running containers without removing them
#   docker compose start       - start previously stopped containers
```

This command allows you to see which containers have an open port to
the host machine:

MacOS/Linux:
```bash
docker inspect --format='{{.Name}} -> {{range $p, $conf := .NetworkSettings.Ports}}{{$p}} -> {{(index $conf 0).HostPort}}{{"\n"}}{{end}}' $(docker ps -q)
```

Windows:
```bash
docker inspect --format='{{.Name}} -> {{range $p, $conf := .NetworkSettings.Ports}}{{$p}} -> {{(index $conf 0).HostPort}}{{"\n"}}{{end}}' $(docker ps -q)
```

## USEFUL DOCKER COMMANDS

```bash
# Show running docker containers
docker ps

# Show running and stopped docker containers
docker ps -a

# Show only the container information we want.
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"

# List all images
docker images                             

# Prune dangling images
docker image prune                        

# Run a container and map a port
docker run -p <port>:<port> <image name>  

# Remove an image
docker rmi <image name>                   

# Start a shell in a running container
docker exec -it <container name> sh       

# Remove all stopped containers
docker prune                              

# Remove all stopped containers and all unused images
docker prune -a                           
```

## USEFUL CURL COMMANDS

To send a message to the system using curl, you can run the following
command to do so:

```bash
curl -X POST http://localhost:3000/a -H "Content-Type: application/json" -d '{ "message": "hello" }'
```

The `-X` flag indicates that the `POST` HTTP method will be used. The
`-H` flag allows us to define a header field. In this case, we need to
send JSON data. This requires us to specify the mime-type, which is
`application/json`. The header field in HTTP that is used to specify
this is called `Content-Type`. The `-d` flag specifies the data we are
going to send. In this case, we have a simple JSON object that is
expected by the system.
