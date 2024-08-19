// components/Card.jsx

import React from 'react';

const Card = ({ name, url, description, imageURL }) => {
  return (
    <div style={styles.card}>
      {imageURL && <img src={imageURL} alt={name} style={styles.image} />}
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.description}>{description}</p>
      <a href={url} style={styles.link} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    maxWidth: '400px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  name: {
    fontSize: '1.5em',
    margin: '16px 0 8px',
  },
  description: {
    fontSize: '1em',
    margin: '8px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1em',
  },
};

export default Card;
