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
const AllCreatorsPage = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators') // Replace 'creators' with your table name
          .select('*');

        if (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load content creators.');
        } else {
          setCreators(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Content Creators</h1>
      <Link to="/new">
        <button>Add a New Content Creator</button>
      </Link>
      {creators.length > 0 ? (
        creators.map(creator => (
          <Card
            key={creator.id} // Assuming each creator has a unique 'id'
            name={creator.name}
            url={creator.url}
            description={creator.description}
            imageURL={creator.imageURL}
          />
        ))
      ) : (
        <p>No content creators found in the database.</p>
      )}
    </div>
  );
};

// Routing setup for the application
const App = () => {
  const routes = useRoutes([
    { path: "/", element: <AllCreatorsPage /> },
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
