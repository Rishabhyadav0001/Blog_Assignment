import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../redux/actions/blogActions';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, TextField } from '@material-ui/core';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, content: content.getCurrentContent().getPlainText() }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <Editor
        editorState={content}
        onChange={setContent}
      />
      <Button type="submit" color="primary" variant="contained">Create Blog</Button>
    </form>
  );
};

export default BlogForm;
