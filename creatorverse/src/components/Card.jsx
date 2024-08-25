import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Card = ({ id, name, url, description, imageURL }) => {
  console.log("Card Component ID:", id); // Debugging: Check if id is received

  return (
    <div style={styles.card}>
      {imageURL && <img src={imageURL} alt={name} style={styles.image} />}
      <div style={styles.header}>
        <h2 style={styles.name}>{name}</h2>
        <Link to={`/creator/${id}`} style={styles.editIcon}> {/* Link to ViewCreator page */}
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
    margin: '16px 0',
    maxWidth: '400px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'relative',
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
  },
  description: {
    fontSize: '1em',
    margin: '8px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1em',
    display: 'inline-block',
    marginBottom: '16px',
  },
  editIcon: {
    color: '#007bff',
    fontSize: '1.2em',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default Card;
