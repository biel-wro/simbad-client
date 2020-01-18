FROM node:11.1.0 as npm-builder
COPY ./package.json /usr/simbad-client/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json

WORKDIR /usr/simbad-client/app
RUN npm install --silent

FROM npm-builder as app-builder
COPY . /usr/simbad-client/app
ENV PATH /usr/simbad-client/app/node_modules/.bin:$PATH
WORKDIR /usr/simbad-client/app
RUN npm run build

FROM nginx
COPY --from=app-builder /usr/simbad-client/app/dist/projects/simbad-client /usr/share/nginx/html
COPY --from=jsokolowski/simbad-viewer /usr/share/nginx/html/viewer/ /usr/share/nginx/html/viewer
