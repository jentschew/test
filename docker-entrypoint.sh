#!/bin/bash
# docker-entrypoint.sh

npx prisma migrate dev --name init

npx prisma generate

exec "$@"