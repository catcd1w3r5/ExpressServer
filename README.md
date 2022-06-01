# ExpressServer

ExpressServer Template meant for larger scale projects.
It aims to reduce code size and improve readability through dynamically looking for files in the directory structure.

**[Warning]** This project is under active development and is not ready for production use.

## To get started right away

### Index.js

```js
//Install Express - npm install express
const Express = require('express');
const App = Express();
const {loadMiddlewares, loadEndpoints} = require('./serverFunctions');

//Locate and load all middlewares in the middleware folder using fs
loadMiddlewares(App, './Middleware');

//Locate and load all endpoints in the endpoint folder using fs
loadEndpoints(App, './Controller/Endpoint');

App.listen(3000, () => {
    console.log('Server is running on port 3000');
});

````

#### Folders

The folders used to configure the endpoints and middleware folders can be configured in the file above by changing the
path to the folder in loadEndpoints and loadMiddlewares respectively.

### Endpoints

By default, the ExpressServer will use the folder './Controller/Endpoints' as the endpoint folder. Any files in this
folder will be automatically loaded as endpoints. access them by using the following syntax:

Endpoint Object:

```js
module.export = {
    name: 'TestEndpoint',
    method: 'POST',
    path: '/test',
    handler: function (req, res) {
        res.send('POST : Hello World! (Endpoint)');
    }
}
``` 

Endpoint Object Properties

| Properties | default         | Accepts                               | description                      |
|------------|-----------------|---------------------------------------|----------------------------------|
| disabled   | false           | any                                   | Should the endpoint be disabled? |
| name       | 'Unnamed'       | string                                | Name of the Endpoint             |
| method     | 'GET'           | 'get', 'post', 'put', 'delete', 'all' | The endpoint method              |
| path       | none (required) | string                                | The endpoint path                |
| handler    | none (required) | function(req,res)                     | The endpoint function            |

Array of Endpoint Objects:

```js
module.export = [
    {
        name: 'TestEndpoint',
        method: 'POST',
        path: '/test',
        handler: function (req, res) {
            res.send('POST : Hello World! (Endpoint)');
        }
    },
    {
        name: 'TestEndpoint2',
        method: 'GET',
        path: '/test2',
        handler: function (req, res) {
            res.send('GET : Hello World! (Endpoint)');
        }
    }
]
```

### Middleware

By default, the ExpressServer will use the folder './Middleware' as the middleware folder. Any files in this folder will
be automatically loaded as middleware. access them by using the following syntax:

Middleware Object:

```js
module.export = {
    name: 'TestMiddleware',
    handler: function (req, res, next) {
        res.send('POST : Hello World! (Middleware)');
    }
}
``` 

Middleware Object Properties:

| Properties | default         | Accepts                | description                        |
|------------|-----------------|------------------------|------------------------------------|
| disabled   | false           | any                    | Should the middleware be disabled? |
| name       | 'Unnamed'       | string                 | Name of the Middleware             |
| priority   | 0               | number                 | The middleware priority            |
| handler    | none (required) | function(req,res,next) | The middleware function            |

Middleware Function:

```js
module.export = function (req, res, next) {
    res.send('POST : Hello World! (Middleware)');
}
```

Middleware Function are automatically wrapped in a middleware object.

The Middleware Object Properties are:

| Properties | Converted To:                     |
|------------|-----------------------------------|
| disabled   | false                             |
| name       | 'Middleware Object from Function' |
| priority   | 0                                 |
| handler    | the function                      |

Arrays of middleware objects , middleware functions, or a mix of both are accepted.

Array of Middleware Objects/Functions:

```js
module.export = [
    {
        name: 'TestMiddleware',
        handler: function (req, res, next) {
            res.send('POST : Hello World! (Middleware)');
        }
    },
    function (req, res, next) {
        res.send('GET : Hello World! (Middleware)');
    }
]
```
