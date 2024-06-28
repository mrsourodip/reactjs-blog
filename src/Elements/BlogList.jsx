import React from 'react';

const BlogList = ({ blogs, onSelect }) => (
  <div className='bg-gray-100 p-4 rounded'>
    {blogs.length > 0 ? (
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className='mb-2'>
            <button
              onClick={() => onSelect(blog)}
              className='text-blue-500 block w-full text-left'
            >
              {blog.title}
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className='text-gray-500'>You have not written any blogs yet.</p>
    )}
  </div>
);

export default BlogList;
