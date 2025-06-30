import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/edit', 'routes/edit.tsx'),
  route('/spread/:id', 'routes/spread.tsx'),
  route('/share/', 'routes/share.tsx'),
] satisfies RouteConfig;
