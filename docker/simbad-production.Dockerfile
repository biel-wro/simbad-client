FROM node:11.1.0 as npm_builder
COPY ./package.json /usr/simbad-client/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json

WORKDIR /usr/simbad-client/app
RUN npm install --silent

FROM npm_builder as builder
COPY . /usr/simbad-client/app
ENV PATH /usr/simbad-client/app/node_modules/.bin:$PATH
WORKDIR /usr/simbad-client/app
RUN npm run build

FROM nginx
COPY --from=builder /usr/simbad-client/app/dist/projects/simbad-client /usr/share/nginx/html
COPY ./viewer /usr/share/nginx/html/viewer
