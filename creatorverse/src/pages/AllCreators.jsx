// pages/AllCreators.jsx






import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../client'; // Adjust the path as necessary
import Card from '../components/Card';

const AllCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const creatorsSectionRef = useRef(null); // Reference to the creators section

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

  const handleViewAllCreators = () => {
    creatorsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Main Screen with Centered Buttons and Background */}
      <div style={styles.mainScreen}>
        <div style={styles.centeredButtons}>
          <button onClick={handleViewAllCreators} style={styles.button}>
            View All Creators
          </button>
          <Link to="/new" style={styles.buttonLink}>
            <button style={styles.button}>Add Content Creator</button>
          </Link>
        </div>
      </div>

      {/* Content Creators Section with Different Background */}
      <div ref={creatorsSectionRef} style={styles.cardContainer}>
        {creators.length > 0 ? (
          creators.map(creator => (
            <Card
              key={creator.id}
              id={creator.id}
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
    </div>
  );
};

const styles = {
  mainScreen: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("/src/assets/mainscreen.jpg")', // Replace with your main screen background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  centeredButtons: {
    textAlign: 'center',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '1.2em',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  buttonLink: {
    textDecoration: 'none',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '16px',
    padding: '40px 0', // Adding some padding around the cards
    backgroundImage: 'url("/src/assets/contentscreen.jpg")', // Replace with your cards section background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};

export default AllCreators;
