// pages/AllCreators.jsx



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../client';
import Card from '../components/Card';


const AllCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators') // Replace 'creators' with your actual table name
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
    return <p>Loading...</p>; // You can replace this with a spinner if you like
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

export default AllCreators;
