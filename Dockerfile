FROM node:alpine

# Create app directory
WORKDIR /soap_interface

# Install app dependencies
COPY package.json /soap_interface/
RUN npm install

# Bundle app source
COPY . /soap_interface/
#RUN node server

CMD [ "node", "server.js"]
