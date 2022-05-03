const { debugMode } = require('../Util/ServerExtras');
module.exports = {
    name: 'ReqDebug',
    disabled : !debugMode,
    priority: 1,
    handle: function (req, res, next) {
        //Log the request (in depth)
        console.log(req.method, req.url, req.body);
        const IncomingRequest =
            `
            | Request:
            ${req.method} ${req.url}
            ${JSON.stringify(req.body)}
            | Headers:
            ${JSON.stringify(req.headers)}
           | Cookies:
            ${JSON.stringify(req.cookies)}
            | Session:
            ${JSON.stringify(req.session)}
            | Query:
            ${JSON.stringify(req.query)}
            | Params:
            ${JSON.stringify(req.params)}
            | Files:
            ${JSON.stringify(req.files)}
            | Signed Cookies:
            ${JSON.stringify(req.signedCookies)}
            `;
        //Call the next middleware
        console.log(IncomingRequest);
        next();
    }
}
