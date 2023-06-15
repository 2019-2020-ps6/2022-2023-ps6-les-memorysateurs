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

COPY --from=build /frontend/default.conf /etc/nginx/conf.d/default.conf

# Copier le build de l'application Angular
# dossier dist : contient les fichiers statiques de l'application après le build
COPY --from=build /frontend/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]