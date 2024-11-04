import React from 'react';
import Search from './Components/Search';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Blog Search</h1>
      <Search />
    </div>
  );
};

export default App;