FROM node:16.16.0-alpine as build

USER node
WORKDIR /frontend

COPY --chown=node:node . .

RUN npm install

RUN npm run build:prod


###########################################


FROM nginxinc/nginx-unprivileged

USER nginx
WORKDIR /frontend

COPY --from=build /frontend/dist /usr/share/nginx/html
