To build the image, run
``` docker build -t moonwalk-frontend . ```

Once this has completed, run this command to run the app:
```
docker run -t -p 3000:3000 -p 8050:8050  moonwalk-frontend
```

Navigate to 0.0.0.0:3000 in your browser.

You can use the command ```docker ps``` to see all running docker containers.
Then you can stop a container by running ```docker stop <container id>``` command.
If you want to build again, first remove the container:
 ```docker rm <container id>```
NB: you can find all exited containers with the command``` docker ps -a```
and then to see all docker images on your machine, use
```docker images```

You can delete images with ```docker rmi <image id>```

To get a shell inside the docker container:
```
docker exec -ti <container id> bash
```
