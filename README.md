This is scaffolding for a single micro service with docker and pm2 under the hood

All services should be driven by a docker swarm or using pm2 
 
**Installation** 
* *npm run setup* (install nuget packages & typings)

**Docker**
* For local development run  *docker-compose -f docker-compose.yml up mongodb*

**Run**

* *gulp build* (build ts files)
* *gulp test* (run mocha tests)
* *gulp tslint* (run tslint)
* *gulp watch* (watch ts files)
* *npm run start* (start the application)
* *npm run watch* (restart the application when files change)

**Production**
* Set NODE_ENV to prod 
* use docker along with with CI's such as TRAVIS CI or GITLAB CI etc to deliver your images on your docker hosts   


* npm i
* npm run build
* npm run tsc-watch

* remember to create launch.json for VScode

*{
*  "version": "0.2.0",
*  "configurations": [
*    {
*      "type": "node",
*      "request": "launch",
*      "name": "nodemon",
*      "runtimeExecutable": "${workspaceFolder}/node_modules/nodemon/bin/nodemon.js",
*      "program": "${workspaceFolder}/build/src/index.js",
*      "restart": true,
*      "console": "integratedTerminal",
*      "internalConsoleOptions": "neverOpen"
*  },
*    {
*      "name": "ng serve",
*      "type": "chrome",
*      "request": "launch",
*      "url": "http://localhost:8100/#",
*      "cwd": "${workspaceFolder}/visitel",
*      "userDataDir": "${workspaceFolder}/visitel/chromeDataDir",
*      "webRoot": "${workspaceFolder}/visitel",
*    },
*    {
*      "name": "ng test",
*     "type": "chrome",
*      "request": "launch",
*      "url": "http://localhost:9876/debug.html",
*      "webRoot": "${workspaceFolder}",
*      "sourceMaps": true,
*      "sourceMapPathOverrides": {
*        "/./*": "${webRoot}/*",
*        "/src/*": "${webRoot}/*",
*        "/*": "*",
*        "/./~/*": "${webRoot}/node_modules/*"
*      }
*    },
*    {
*      "name": "ng e2e",
*      "type": "node",
*      "request": "launch",
*      "program": "${workspaceFolder}/node_modules/protractor/bin/protractor",
*      "protocol": "inspector",
*      "args": [
*        "${workspaceFolder}/e2e/protractor.conf.js"
*      ]
*    },
*    {
*      "name": "serve:ssr",
*      "type": "chrome",
*      "request": "launch",
*      "preLaunchTask": "npm: serve:ssr",
*      "url": "http://localhost:4000/#",
*      "webRoot": "${workspaceFolder}"
*    },
*  ]
*}
