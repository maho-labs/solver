#!/usr/bin/env bash
curl -X POST "http://127.0.0.1:8787/" -H 'Content-Type: application/json' -d '{"signature":"'"${1}"'"}'
