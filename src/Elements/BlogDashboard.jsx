import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogList from './BlogList';
import BlogEditor from './BlogEditor';
import BlogView from './BlogView';
import { v4 as uuidv4 } from 'uuid';

const BlogDashboard = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/blogs');
        const userBlogs = response.data.filter(
          (blog) => blog.authoredBy === username
        );
        const remainingBlogs = response.data.filter(
          (blog) => blog.authoredBy !== username
        );
        setBlogs(userBlogs);
        setOtherBlogs(remainingBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blogs.');
      }
    };

    fetchBlogs();
  }, [username]);

  const handleAddBlog = async (title, content) => {
    const newBlog = { id: uuidv4(), title, content, authoredBy: username };

    try {
      await axios.post('http://localhost:3002/blogs', newBlog);
      setBlogs([...blogs, newBlog]);
      setEditingBlog(null);
      toast.success('Blog added successfully!');
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Failed to add blog.');
    }
  };

  const handleUpdateBlog = async (id, title, content) => {
    try {
      await axios.put(`http://localhost:3002/blogs/${id}`, {
        title,
        content,
        authoredBy: username,
      });
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, title, content } : blog
        )
      );
      setEditingBlog(null);
      setSelectedBlog(null);
      toast.success('Blog updated successfully!');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog.');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setSelectedBlog(null);
      toast.success('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog.');
    }
  };

  return (
    <div className='flex min-h-screen'>
      <ToastContainer />
      <div className='w-1/4 p-4 bg-gray-100'>
        <button
          onClick={() => setEditingBlog({})}
          className='bg-blue-500 text-white p-2 w-full mb-4 rounded'
        >
          Write a Blog
        </button>
        <h3 className='text-xl font-bold mb-2'>Your Blogs</h3>
        <BlogList blogs={blogs} onSelect={setSelectedBlog} />
        <h3 className='text-xl font-bold mb-2 mt-4'>Other Blogs</h3>
        <BlogList blogs={otherBlogs} onSelect={setSelectedBlog} />
      </div>
      <div className='w-3/4 p-4 bg-white'>
        {editingBlog ? (
          <BlogEditor
            blog={editingBlog}
            onSave={handleAddBlog}
            onUpdate={handleUpdateBlog}
            onCancel={() => setEditingBlog(null)}
          />
        ) : selectedBlog ? (
          <BlogView
            blog={selectedBlog}
            canEdit={selectedBlog.authoredBy === username}
            onEdit={() => setEditingBlog(selectedBlog)}
            onDelete={() => handleDeleteBlog(selectedBlog.id)}
          />
        ) : (
          <div className='text-center text-gray-500'>
            Select a blog to view or edit, or write a new blog.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDashboard;
