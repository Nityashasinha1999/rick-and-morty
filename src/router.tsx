import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import App from './App';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetails';

const rootRoute = createRootRoute({
  component: App,
});

const characterListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
  validateSearch: (search: Record<string, unknown>) => {
    let page = 1;
    if (typeof search.page === 'number' && Number.isFinite(search.page)) {
      page = search.page;
    } else if (typeof search.page === 'string' && /^\d+$/.test(search.page)) {
      page = parseInt(search.page, 10);
    }
    return { page };
  },
});

const characterDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'character/$id',
  component: CharacterDetails,
});

const routeTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailsRoute,
]);

export const router = createRouter({
  routeTree,
});

export { characterListRoute };

// For type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
} 