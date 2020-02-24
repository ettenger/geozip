import http from 'http';

// Returns true if more request handling is needed; false if no more request handling is required
export function handleCors(req: http.IncomingMessage, res: http.ServerResponse): boolean {
  const origin = req.headers.origin;
  const isCrossOrigin = !!origin;
  if (isCrossOrigin) {
    if (isAllowedByCors(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'false');
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.end();
        return false;
      }
    } else {
      res.statusCode = 403;
      res.end();
      return false;
    }
  }
  return true;
}

function isAllowedByCors(origin): boolean {
  // TODO: Read in origin whitelist from process.env and test
  return true;
}
