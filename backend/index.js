const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Directly specify the MongoDB connection URL here
const mongoURI = 'mongodb+srv://ojhasumit0428:tODeYr0mx3aVpsCc@cluster0.x96xfr5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRouter = require('./routes/User.route');
const blogRouter = require('./routes/Blog.route');
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// Default route
app.get('/', (req, res) => {
    res.json('Server is running');
});

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        // Start the server after successfully connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
