// App.jsx

import React from 'react';
import Card from './components/Card';

const App = () => {
  return (
    <div>
      <h1>Content Creators</h1>
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
    </div>
  );
};

export default App; // Ensure this line is present
