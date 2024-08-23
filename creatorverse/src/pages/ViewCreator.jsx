// pages/ViewCreator.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const ViewCreator = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>View Content Creator</h2>
      <p>Displaying details for creator with ID: {id}</p>
      {/* Additional details would be fetched and displayed here */}
    </div>
  );
};

export default ViewCreator;
