// pages/ViewCreator.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import supabase from '../client'; // Adjust the path as necessary

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators') // Replace 'creators' with your table name
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching creator:', error);
          setError('Failed to load content creator details.');
        } else {
          setCreator(data);
        }
      } catch (error) {
        console.error('Error fetching creator:', error.message);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this content creator?')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting creator:', error);
          setError('Failed to delete content creator.');
        } else {
          console.log('Content creator deleted');
          navigate('/'); // Redirect to the main page after deletion
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError('An unexpected error occurred.');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!creator) {
    return <p>No content creator found.</p>;
  }

  return (
    <div>
      <h2>{creator.name}</h2>
      <p>URL: <a href={creator.url} target="_blank" rel="noopener noreferrer">{creator.url}</a></p>
      <p>Description: {creator.description}</p>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: '300px' }} />}
      
      <div style={{ marginTop: '20px' }}>
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewCreator;
