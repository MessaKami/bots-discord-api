import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    customProps: () => ({
      context: 'HTTP',
    }),
    transport: {
      target: 'pino/file',
      options: {
        destination: '/app/logs/app.log',
        mkdir: true
      }
    },
    level: 'info',
    autoLogging: true,
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie'],
      remove: true
    }
  }
}; 