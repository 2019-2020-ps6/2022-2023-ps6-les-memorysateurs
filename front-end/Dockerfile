FROM node:16.16.0-alpine as build

ARG URLBACK
ARG CMDBUILD

USER node
WORKDIR /frontend

COPY --chown=node:node . .

RUN npm install

# Remplacer l'URL du back-end dans le fichier de configuration
RUN sed -i "s/localhost:9428/${URLBACK}/g" ./src/app/services/globals.service.ts

RUN npm run ${CMDBUILD}


###########################################


FROM nginxinc/nginx-unprivileged

USER nginx
WORKDIR /frontend

COPY --from=build /frontend/default.conf /etc/nginx/conf.d/default.conf

# Copier le build de l'application Angular
# dossier dist : contient les fichiers statiques de l'application après le build
COPY --from=build /frontend/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]