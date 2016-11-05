#!/bin/bash
set -e

echo 'Task:' $1
echo 'Service:' $2
echo 'Image:' $3

TASK_FAMILY=$1
SERVICE_NAME=$2
DOCKER_IMAGE=$3
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PROFILE="pinnacle"

CURRENT_IMAGE=`aws ecs describe-task-definition --profile ${PROFILE} --task-definition ${TASK_FAMILY} | egrep "image" | head -n1  | awk '{print $2}' | sed 's/,$//' | sed 's/"$//' | sed 's/^"//'`

if [ ${CURRENT_IMAGE} = ${DOCKER_IMAGE} ]; then
    echo "Error: ${CURRENT_IMAGE} is already tagged as a version"
    exit 1
fi

sed -e "s;%DOCKER_IMAGE%;${DOCKER_IMAGE};g" ${DIR}/ecs/${TASK_FAMILY}-task-definition.json > /tmp/${TASK_FAMILY}-task-definition.json
aws ecs register-task-definition  --profile ${PROFILE} --cli-input-json file:///tmp/${TASK_FAMILY}-task-definition.json > /dev/null

TASK_REVISION=`aws ecs describe-task-definition  --profile ${PROFILE} --task-definition ${TASK_FAMILY} | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//'`
DESIRED_COUNT=`aws ecs describe-services --profile ${PROFILE} --services ${SERVICE_NAME} | egrep "desiredCount" | head -n1 | tr "/" " " | awk '{print $2}' | sed 's/,$//'`

if [ ${DESIRED_COUNT} = "0" ]; then
    DESIRED_COUNT="1"
fi

aws ecs update-service --profile ${PROFILE} --cluster Moonwalk --service ${SERVICE_NAME} --task-definition ${TASK_FAMILY}:${TASK_REVISION} --desired-count ${DESIRED_COUNT} > /dev/null

echo 'Done!'
