// pages/AllCreators.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const AllCreators = () => {
  return (
    <div>
      <h2>All Content Creators</h2>
      <Card
        name="John Doe"
        url="https://example.com"
        description="John is a content creator specializing in web development tutorials."
        imageURL="https://via.placeholder.com/150"
      />
      <Card
        name="Jane Smith"
        url="https://example.com"
        description="Jane creates amazing videos on graphic design and digital art."
      />
      <Link to="/new">Add a New Creator</Link>
    </div>
  );
};

export default AllCreators;
