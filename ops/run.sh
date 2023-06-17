#!/bin/bash
docker compose -f docker-compose-proxy.yml build
docker compose -f docker-compose-proxy.yml up -d

exit 0