// App.jsx

// App.jsx

import React, { useEffect, useState } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import supabase from './client'; // Adjust the path as necessary
import Card from './components/Card';
import AllCreators from './pages/AllCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator'; // Ensure this import exists

// Main component to display all content creators


// Routing setup for the application
const App = () => {
  const routes = useRoutes([
    { path: "/", element: <AllCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "/new", element: <AddCreator /> }, // Route for adding a new creator
  ]);

  return (
    <div>
      {routes}
    </div>
  );
};

export default App;
