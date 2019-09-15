FROM node:11.1.0 as npm_builder
    # Set the entrypoint as bin bash incase we want to inspect the container
ENTRYPOINT ["/bin/bash"]
    # Manually copy the package.json
COPY ./package.json /usr/simbad-client/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
    # Set the work directory to where we copied our source files
WORKDIR /usr/simbad-client/app
    # Install all of our dependencies
RUN npm install

FROM npm_builder as builder
    # Copy the app excluding everything in the .dockerignore
COPY . /usr/simbad-client/app
    # Put node_modules into the path, this will purely be used for accessing the angular cli
ENV PATH /usr/simbad-client/app/node_modules/.bin:$PATH
    # Set the work directory to where we copied our source files
WORKDIR /usr/simbad-client/app
    # Build our distributable
RUN npm run build

FROM node:11.1.0 as production
    # Copy the dist folder from builder
COPY --from=builder /usr/simbad-client/app/dist/projects/simbad-client /usr/simbad-client/app
    # Set the work directory to where we copied our source files
WORKDIR /usr/simbad-client/app
