import express from 'express';
import http from 'http';
import cors from 'cors';
import socketio from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string.
mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your MongoDB schema and model here
// For example, you can use mongoose.Schema and mongoose.model

// Add routes for CRUD operations and data retrieval here

// Socket.io setup for real-time data updates
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events like data updates here

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
