const initialState = {
  blogs: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return { ...state, blogs: action.payload };
    case 'CREATE_BLOG':
      return { ...state, blogs: [...state.blogs, action.payload] };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
      };
    default:
      return state;
  }
};

export default blogReducer;
