const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/blog-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
