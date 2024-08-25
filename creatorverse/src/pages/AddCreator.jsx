// pages/AddCreator.jsx

// AddCreator.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../client'; // Adjust the path as necessary

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([
          { name, url, description, imageURL }
        ]);

      if (error) {
        console.error('Error adding content creator:', error);
      } else {
        console.log('Content creator added:', data);
        navigate('/'); // Redirect to the main page after submission
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add a New Content Creator</h1>
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
        <button type="submit" style={styles.submitButton}>Add Creator</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("/src/assets/contentscreen.jpg")', // Replace with your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  heading: {
    color: 'white',
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
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default AddCreator;
