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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Edit Content Creator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL (optional):</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>Update Creator</button>
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
  deleteButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EditCreator;
