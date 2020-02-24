import { Route } from '../interfaces';

export function matchRoute(routes: Route[], url: string) {
  let params;
  const route = routes.find(r => {
    params = routesMatch(url, r.path);
    return !!params;
  });
  if (route) {
    return {route, params};
  }
}

// Return data extracted from url if its pattern matches the route
// No match => return false
function routesMatch(url: string, route: string): false | {} {
  const urlArr = trimSlashes(url).split('/');
  const routeArr = trimSlashes(route).split('/');
  const routeArrLength = routeArr.length;
  if (urlArr.length !== routeArrLength) {
    return false;
  }
  const data = {};
  for (let i = 0; i < routeArrLength; i++) {
    const path = routeArr[i];
    if (/^:/.test(path)) {
      data[path.slice(1)] = urlArr[i];
    } else if (path !== urlArr[i]) {
      return false;
    }
  }
  return data;
}

function trimSlashes(url: string) {
  return url.replace(/^\/|\/$/g, '');
}
