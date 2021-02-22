#!/bin/sh

docker pull rabbitmq
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 8082:15672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3-management
