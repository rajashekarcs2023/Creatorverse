// pages/EditCreator.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client'; // Adjust the path as necessary

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Captured ID:', id);

    if (!id) {
      setError('Invalid ID.');
      setLoading(false);
      return;
    }

    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching creator:', error);
          setError('Failed to load content creator details.');
        } else {
          setName(data.name);
          setUrl(data.url);
          setDescription(data.description);
          setImageURL(data.imageURL);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('creators')
        .update({ name, url, description, imageURL })
        .eq('id', id);

      if (error) {
        console.error('Error updating creator:', error);
        setError('Failed to update content creator.');
      } else {
        console.log('Content creator updated');
        navigate('/'); // Redirect to the main page after submission
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An unexpected error occurred.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this content creator?')) {
      return;
    }

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
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Content Creator</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL (optional):</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={{ ...styles.submitButton, opacity: loading ? 0.5 : 1 }} disabled={loading}>
          Update Creator
        </button>
      </form>
      <button
        onClick={handleDelete}
        style={{
          ...styles.deleteButton,
          opacity: loading ? 0.5 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
        disabled={loading}
      >
        Delete Creator
      </button>
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
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for the form
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    color: 'white',
    display: 'block',
    marginBottom: '5px',
    fontSize: '1em',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2em',
    cursor: 'pointer',
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

export default EditCreator;
