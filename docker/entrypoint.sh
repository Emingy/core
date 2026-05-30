#!/bin/bash
set -e

serve storybook-static -p 3000 -s &

until curl -sf http://127.0.0.1:3000 > /dev/null 2>&1; do
    sleep 1
done

exec "$@"
