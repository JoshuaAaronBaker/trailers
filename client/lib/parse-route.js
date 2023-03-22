export default function parseRoute(pathRoute) {
  if (pathRoute.startsWith('/')) {
    pathRoute = pathRoute.replace('/', '');
  }
  const [path, queryString] = pathRoute.split('?');
  const params = new URLSearchParams(queryString);
  return { path, params };
}
