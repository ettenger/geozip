import http from 'http';
import { includes } from 'lodash';
import { matchRoute, parseBody, handleCors } from './';
import { Route } from '../interfaces';

// Note: This server will not read the body from a DELETE
const methodsWithBodies = ['POST', 'PUT', 'PATCH'];

export async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse, routes: Route[], controllers) {
  const continueHandling = handleCors(req, res);

  if (!continueHandling) {
    return;
  }

  if (includes(methodsWithBodies, req.method) && req.headers['content-type'] !== 'application/json') {
    res.statusCode = 400;
    res.end('Content must be JSON');
    return;
  }

  const routingInfo = matchRoute(routes, req.url);
  if (!routingInfo) {
    res.statusCode = 404;
    res.end();
  } else if (!includes(Object.keys(routingInfo.route.actions), req.method)) {
    res.statusCode = 405;
    res.end();
  } else {
    await handleValidRequest(req, res, routingInfo.route, routingInfo.params, controllers);
  }
}

// tslint:disable-next-line:max-line-length
async function handleValidRequest(req: http.IncomingMessage, res: http.ServerResponse, route: Route, params, controllers) {
  res.setHeader('Content-Type', 'application/json');
  // The client gets to hold the socket open for 20 seconds
  req.setTimeout(20000, null);

  if (includes(methodsWithBodies, req.method)) {
    const body = await parseBody(req);
    req['body'] = body;
  }

  try {
    const message = await controllers[route.controller][route.actions[req.method]](req, res, params);
    res.end(JSON.stringify(message));
  } catch (err) {
    res.statusCode = err.statusCode || 500;
    res.end(JSON.stringify(err.message));
  }
}
