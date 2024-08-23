// App.jsx

import React from 'react';
import { useRoutes } from 'react-router-dom';
import AllCreators from './pages/AllCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <AllCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "/new", element: <AddCreator /> },
  ]);

  return (
    <div>
      {routes} {/* Routes are inserted into the App container */}
    </div>
  );
};

export default App;
