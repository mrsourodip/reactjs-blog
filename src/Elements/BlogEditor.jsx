import React, { useState, useEffect } from 'react';

const BlogEditor = ({ blog = {}, onSave, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(blog.title || '');
  const [content, setContent] = useState(blog.content || '');

  useEffect(() => {
    setTitle(blog.title || '');
    setContent(blog.content || '');
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog.id) {
      onUpdate(blog.id, title, content);
    } else {
      onSave(title, content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white p-4 rounded shadow'>
      <h2 className='text-2xl mb-4'>
        {blog.id ? 'Edit Blog' : 'Write a Blog'}
      </h2>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border p-2 w-full'
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border p-2 w-full'
          rows='10'
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 mr-2 rounded'
        >
          {blog.id ? 'Update' : 'Submit'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='bg-gray-500 text-white p-2 rounded'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogEditor;
