# docker — Containers

## Images

```bash
docker images                        # list local images
docker pull node:20                  # pull from Docker Hub
docker rmi image:tag                 # remove image
docker build -t my-app .             # build from Dockerfile
docker build -t my-app:v1 .          # with tag
```

## Containers

```bash
docker run node:20                   # run a container
docker run -it node:20 bash          # interactive shell
docker run -d -p 3000:3000 my-app    # detached, port mapping
docker run --rm my-app               # auto-remove on exit
docker run -v $(pwd):/app my-app     # mount volume

docker ps                            # running containers
docker ps -a                         # all containers
docker stop <id>                     # stop gracefully
docker rm <id>                       # remove container
docker logs <id>                     # view logs
docker logs -f <id>                  # follow logs
docker exec -it <id> bash            # shell into running container
```

## Dockerfile basics

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Docker Compose

```bash
docker compose up                    # start all services
docker compose up -d                 # detached
docker compose down                  # stop and remove
docker compose logs -f               # follow logs
docker compose exec app bash         # shell into service
docker compose ps                    # list services
```

`docker-compose.yml` example:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## Clean up

```bash
docker system prune                  # remove unused resources
docker system prune -a               # include unused images
docker volume prune                  # remove unused volumes
docker image prune                   # remove dangling images
```

## Useful patterns

```bash
# Copy file out of container
docker cp <id>:/app/output.json ./output.json

# Inspect container config
docker inspect <id>

# Check resource usage
docker stats

# Run one-off command in a clean container
docker run --rm -v $(pwd):/work -w /work node:20 npm test
```
