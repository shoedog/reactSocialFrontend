FROM node
WORKDIR /src
EXPOSE 3000
EXPOSE 8050
EXPOSE 3001
ENTRYPOINT ["npm", "run", "dev"]
COPY . /src
RUN npm i
RUN npm i -g cross-env
RUN npm i -g concurrently
RUN npm i -g nodemon
