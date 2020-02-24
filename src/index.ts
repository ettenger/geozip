import http from 'http';
import dotenv from 'dotenv';
import { handleRequest } from './lib';
import { routes } from './routes';
import * as controllers from './controllers';

dotenv.config();
const port = process.env.PORT;

function startServer(): void {
  http.createServer((req, res) => handleRequest(req, res, routes, controllers))
    .listen(port);
  console.log(`Listening on port ${port}`);
}

startServer();
