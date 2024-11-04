import React, { useEffect, useContext } from 'react';
import { blogContext } from '../App';
import SearchInput from './SearchInput';

const Search = () => {
  
  const {blogs, filteredBlogs, setFilteredBlogs, query} = useContext(blogContext);
  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs])

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

      <SearchInput />
      
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