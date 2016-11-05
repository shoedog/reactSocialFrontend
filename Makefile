CURRENT_VERSION = $(shell git rev-parse HEAD)

DOCKER_IMAGE = moonwalk-frontend
DOCKER_DEPLOY_IMAGE = 328619549554.dkr.ecr.us-west-2.amazonaws.com/moonwalk-frontend

docker-build:
	docker build -t $(DOCKER_IMAGE) .

run:
	docker run --name moonwalk-frontend -p 3000:3000 $(DOCKER_IMAGE)

docker-push:
	eval `aws ecr get-login --region us-west-2 --profile OSU`
	docker tag $(DOCKER_IMAGE) $(DOCKER_DEPLOY_IMAGE):$(CURRENT_VERSION)
	docker push $(DOCKER_DEPLOY_IMAGE):$(CURRENT_VERSION)

# deploy
.PHONY: deploy
deploy:
	deploy/ecs-deploy.sh moonwalk-frontend moonwalk-frontend-service $(DOCKER_DEPLOY_IMAGE):$(CURRENT_VERSION)
