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
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  if (!creator) {
    return <p style={styles.error}>No content creator found.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{creator.name}</h2>
      <p style={styles.text}>
        URL: <a href={creator.url} target="_blank" rel="noopener noreferrer" style={styles.link}>{creator.url}</a>
      </p>
      <p style={styles.text}>Description: {creator.description}</p>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={styles.image} />}
      
      <div style={styles.buttonContainer}>
        <Link to={`/edit/${id}`} style={styles.buttonLink}>
          <button style={styles.button}>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ ...styles.button, ...styles.deleteButton }}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("/src/assets/contentscreen.jpg")', // Replace with your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    color: 'white',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
  },
  image: {
    maxWidth: '300px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonLink: {
    textDecoration: 'none',
  },
  loading: {
    color: 'white',
    fontSize: '1.2em',
  },
  error: {
    color: 'red',
    fontSize: '1.2em',
  },
};

export default ViewCreator;