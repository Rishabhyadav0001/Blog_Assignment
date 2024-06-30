import axios from 'axios';

export const fetchBlogs = () => async (dispatch) => {
  const res = await axios.get('/api/blogs');
  dispatch({ type: 'FETCH_BLOGS', payload: res.data });
};

export const createBlog = (blog) => async (dispatch) => {
  const res = await axios.post('/api/blogs', blog);
  dispatch({ type: 'CREATE_BLOG', payload: res.data });
};

export const updateBlog = (id, blog) => async (dispatch) => {
  const res = await axios.put(`/api/blogs/${id}`, blog);
  dispatch({ type: 'UPDATE_BLOG', payload: res.data });
};

export const deleteBlog = (id) => async (dispatch) => {
  await axios.delete(`/api/blogs/${id}`);
  dispatch({ type: 'DELETE_BLOG', payload: id });
};
const initialState = {
  blogs: [],
};

