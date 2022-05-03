# ExpressServer

ExpressServer Template meant for larger scale projects.

Note that this is a template and not a full-featured ExpressServer.

**[Warning]** This project is under active development and is not ready for production use.


## To get started right away

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

### Folders

The folders used to configure the endpoints and middleware folders can be configured in the app.js file
