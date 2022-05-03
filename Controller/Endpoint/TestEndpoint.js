//NOTE: const {debugMode} = require('../Util/ServerExtras');
//This is just another thing to check if server is running in debug mode

//Sample 1
//U can module.exports an object or an array
//It is handled automatically
//Endpoints and Middlewares are defined by a specific root folder they are in

//Pros:
//- easy to understand
//- easy to extend
//- easy to debug
//Cons:
//- other stuff like app.somethingElse have to be manually added (have other workarounds tho)

//Endpoints
module.exports = [
    {
        //the check is done as if(disabled) so if u set it to 'false' (string) it will be true
        //disabled: !debugMode,
        name: 'TestEndpoint',
        method: 'GET',
        path: '/test',
        handler: function (req, res) {
            res.send('GET : Hello World! (Endpoint)');
        }
    },
    {
        name: 'TestEndpoint',
        method: 'POST',
        path: '/test',
        handler: function (req, res) {
            res.send('POST : Hello World! (Endpoint)');
        }
    },
    {
        name: 'TestEndpoint',
        method: 'PUT',
        path: '/test',
        handler: function (req, res) {
            res.send('PUT : Hello World! (Endpoint)');
        }
    },
    {
        name: 'TestEndpoint',
        method: 'DELETE',
        path: '/test',
        handler: function (req, res) {
            res.send('DELETE : Hello World! (Endpoint)');
        }
    }
];

// //Middleware
// const {debugMode} = require('../Util/ServerExtras');
// module.exports = {
//     name: 'TestMiddleware',
//     disabled: !debugMode,
//     priority: 1,
//     handle: function (req, res, next) {
//         //Log the request (in depth)
//         console.log(req.method, req.url, req.body);
//         next();
//     }
// }
//
// //Sample 2
// //U can module.exports a function or an object
//
// //Endpoints and Middlewares are treated as the same
//
// //Pros:
// //- U can use the same code for app.somethingElse
// //- Uses the normal express syntax
// //Cons:
// //- Hard to read and debug
//
// //Endpoint
//
// const {debugMode} = require('../Util/ServerExtras');
//
// module.exports = (app) => {
//     if (debugMode) {
//         app.get('/test', (req, res) => {
//             res.send('GET : Hello World! (Endpoint)');
//         });
//     }
//     app.post('/test', (req, res) => {
//         res.send('POST : Hello World! (Endpoint)');
//     });
//     app.put('/test', (req, res) => {
//         res.send('PUT : Hello World! (Endpoint)');
//     });
//     app.delete('/test', (req, res) => {
//         res.send('DELETE : Hello World! (Endpoint)');
//     });
// };
//
// //Middleware
// //not specifying a priority will make it 0
// module.exports = {
//     priority: 1,
//     handle: (app) => {
//         app.use((req, res, next) => {
//             //Log the request (in depth)
//             console.log(req.method, req.url, req.body);
//             next();
//         });
//     }
// }
