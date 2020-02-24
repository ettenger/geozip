import http from 'http';

export async function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      if (body.length === 0) {
        resolve(undefined);
      } else {
        try {
          resolve(JSON.parse(Buffer.concat(body).toString()));
        } catch (e) {
          e.statusCode = 400;
          reject(e);
        }
    }}).on('error', e => {
      reject(e);
    }).on('timeout', () => {
      reject(new Error('Request timed out'));
    });
  });
}
