import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    customProps: () => ({
      context: 'HTTP',
    }),
    transport: process.env.NODE_ENV !== 'production' 
      ? {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: true,
                levelFirst: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
              }
            },
            {
              target: 'pino/file',
              options: {
                destination: '/app/logs/app.log',
                mkdir: true
              }
            }
          ]
        }
      : {
          target: 'pino/file',
          options: {
            destination: '/app/logs/app.log',
            mkdir: true
          }
        },
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    autoLogging: true,
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie'],
      remove: true
    }
  }
}; 