#!/bin/bash
set -e

npx http-server storybook-static -p 3000 -a 0.0.0.0 --silent &

until curl -sf http://127.0.0.1:3000 >/dev/null; do
    sleep 1
done

exec "$@"