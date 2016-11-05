FROM node
WORKDIR /src
EXPOSE 3000
ENTRYPOINT ["npm", "run", "prod:start"]
COPY . /src
RUN npm i
RUN npm i -g cross-env
RUN npm i -g concurrently
RUN npm i -g nodemon
