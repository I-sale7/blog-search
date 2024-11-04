import React, {useEffect, useState, createContext} from 'react';
import Search from './Components/Search';
import { fetchBlogs } from './Services/blog';

export const blogContext = createContext('blogContext');
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogData = await fetchBlogs();
        setBlogs(blogData);
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <blogContext.Provider value={{blogs, setBlogs, filteredBlogs, setFilteredBlogs, query, setQuery}}>
        <Search />
      </blogContext.Provider>
    </div>
  );
};

export default App;