import React, { useState, useEffect } from 'react';
import { fetchBlogs } from '../Services/blog';

const Search = () => {
  const [query, setQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogData = await fetchBlogs();
        setBlogs(blogData);
        setFilteredBlogs(blogData);
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
    
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery) || 
      blog.content.toLowerCase().includes(searchQuery)
    );
    setFilteredBlogs(filtered);
  };

  const highlightCharacters = (text) => {
    if (!query) return text;
    const lowerCaseQuery = query.toLowerCase();
    const texts = text.split(new RegExp(`(${lowerCaseQuery})`, 'gi'));
    const textMapping = texts.map((text, index) => (
      text.toLowerCase() === lowerCaseQuery ? (
        <span key={index} className="bg-yellow-200">{text}</span>
      ) : (
        <span key={index}>{text}</span>
      )
    ));

    return textMapping;
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a blog"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="mt-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <div key={blog.id} className="mb-4 p-4 border border-gray-200 rounded">
              <h2 className="text-lg font-bold">{highlightCharacters(blog.title)}</h2>
              <p>{highlightCharacters(blog.content)}</p>
            </div>
          ))
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default Search;