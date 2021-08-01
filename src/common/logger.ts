import log4js from 'log4js';

export const logger = log4js.getLogger();
logger.level = 'all';
log4js.configure({
    appenders: {server: {type: 'file', filename: 'server.log'}},
    categories: {default: {appenders: ['server'], level: 'all'}},
});
