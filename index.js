const app = require('./app');
const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');

// create server
const SERVER = http.createServer(app);

// listen to the server
SERVER.listen(config.PORT, () => {
    logger.info(`Server is running on port: 5009`);
});