#!/bin/sh
set -e #Abbruch nach Fehler

/usr/local/bin/bootstrap.php

# first arg is `-f` or `--some-option`
if [ $# -eq 0 ] || [ "${1#-}" != "$1" ]; then
    set -- apache2-foreground "$@"
fi

exec "$@"