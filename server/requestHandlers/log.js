const querystring = require('querystring');
const logFind = require('../dbHandlers/loginFind').logFind;

const log = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const data = querystring.parse(body);
        logFind(data).then((dt) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(dt));
            res.end();
        });
    });
};

exports.log = log;
