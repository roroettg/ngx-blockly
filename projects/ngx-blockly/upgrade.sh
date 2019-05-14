#!/bin/sh
rm -r package-lock.json
rm -r node_modules/
npm i
ng update @angular/cli @angular/core
npm run publish