const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

const handle = {};
handle['/'] = requestHandlers.start;


if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    server.start(router.route, handle);
}
