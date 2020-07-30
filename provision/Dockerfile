# Dockerfile based in:
# https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker
# Added some tweaks for my development purpose
FROM node:14.5.0-alpine3.10
LABEL maintainer="cristhian@okchaty.com"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

USER node
RUN npm install

# new syntax  for copy command to change owner of files on copy
COPY --chown=node:node . .
EXPOSE 5500
CMD ["npm", "run", "light-server"]
#CMD ["./node_modules/light-server/bin/light-server", "-s", ".", "-p", "5500"]

# Node image have its pown user, with root privileges, it isrecommended to use him.
