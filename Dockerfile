# specify base image from dockerhub
FROM node:14-alpine3.10
LABEL version="1.0"
LABEL description="Qwerty api"
ENV PORT "$PORT"
# workdir is where our code shall live in the container
# all commands executed relative to this directory
WORKDIR /app

COPY ["package.json", "./"]

# Install dependencies and clear npm cache
RUN npm install && npm cache clean --force

COPY . .

# use EXPOSE command to have our port mapped by the docker daemon
EXPOSE 2121

# default dev command
CMD ["npm", "run", "db:create"]
CMD ["npm", "run", "db:migrate"]
CMD ["npm", "run", "start"]



