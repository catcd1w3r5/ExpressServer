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
