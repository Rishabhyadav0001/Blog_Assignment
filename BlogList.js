import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../redux/actions/blogActions';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <List>
      {blogs.map((blog) => (
        <ListItem key={blog._id} component={Link} to={`/blogs/${blog._id}`}>
          <ListItemText primary={blog.title} secondary={blog.excerpt} />
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;
