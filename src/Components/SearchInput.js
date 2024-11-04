import React, {useContext} from 'react'
import { blogContext } from '../App';


const SearchInput = () => {
  const {blogs, setFilteredBlogs, query, setQuery} = useContext(blogContext);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
    
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery) || 
      blog.content.toLowerCase().includes(searchQuery)
    );
    setFilteredBlogs(filtered);
  };
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a blog"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  )
}

export default SearchInput