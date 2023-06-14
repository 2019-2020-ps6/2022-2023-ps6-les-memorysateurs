FROM node:16.16.0-alpine

RUN apk add curl

USER node
WORKDIR /backend

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
COPY --chown=node:node app ./app

#VOLUME ["./database"]

ENTRYPOINT ["npm","run","start"]



