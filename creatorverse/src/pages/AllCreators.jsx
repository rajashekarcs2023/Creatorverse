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
      {/* Central Buttons Section */}
      <div style={styles.centeredButtons}>
        <button onClick={handleViewAllCreators} style={styles.button}>
          View All Creators
        </button>
        <Link to="/new" style={styles.buttonLink}>
          <button style={styles.button}>Add Content Creator</button>
        </Link>
      </div>

      {/* Hidden Section that will be scrolled to */}
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
  centeredButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
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
  },
};

export default AllCreators;
