import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Reg from './pages/Reg';
import FavRecipes from './pages/FavRecipes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/recipes',
    element: <Recipes />,
    // loader: async () => {
    //   const response = await fetch('/api/products');
    //   return await response.json();
    // },
  },
  {
    path: '/signin',
    element: <Reg />,
  },
  {
    path: '/favorites',
    element: <FavRecipes />,
    // loader: async () => {
    //   const token = store.getState().auth.token;
    //   if (!token) throw new Error('Not authenticated');
    //   return await getProfile(token);
    // },
  },
]);

function Router() {
  const { token } = useSelector(state => state.auth);
  
  return <RouterProvider router={router} />;
}


export default Router;
