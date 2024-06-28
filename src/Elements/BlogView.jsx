import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BlogView = ({ blog, canEdit, onEdit, onDelete }) => (
  <div className='bg-white p-4 rounded shadow'>
    <h2 className='text-2xl mb-4'>{blog.title}</h2>
    <p>{blog.content}</p>
    {canEdit && (
      <div className='mt-4 flex justify-end'>
        <button
          onClick={onEdit}
          className='bg-blue-500 text-white p-2 mr-2 rounded'
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className='bg-red-500 text-white p-2 rounded'
        >
          <FaTrash />
        </button>
      </div>
    )}
  </div>
);

export default BlogView;
