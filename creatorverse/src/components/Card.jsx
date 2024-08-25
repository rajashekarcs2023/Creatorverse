import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    <div style={styles.card}>
      {imageURL && <img src={imageURL} alt={name} style={styles.image} />}
      <div style={styles.header}>
        <h2 style={styles.name}>{name}</h2>
        <Link to={`/creator/${id}`} style={styles.editIcon}>
          <FaEdit />
        </Link>
      </div>
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
    margin: '8px',
    flex: '1 1 calc(30% - 16px)',
    maxWidth: 'calc(30% - 16px)',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Optional: Adds a semi-transparent background
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  name: {
    fontSize: '1.5em',
    margin: '16px 0 8px',
    color: 'white', // Name in white
  },
  description: {
    fontSize: '1em',
    margin: '8px 0',
    color: 'white', // Description in white
  },
  link: {
    color: '#007bff', // Link in blue to indicate it's clickable
    textDecoration: 'underline', // Underline to indicate it's a link
    fontSize: '1em',
    display: 'inline-block',
    marginBottom: '16px',
  },
  editIcon: {
    color: 'white', // Edit icon in white
    fontSize: '1.2em',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default Card;
