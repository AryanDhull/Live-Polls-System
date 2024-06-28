const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const mongoUri = 'mongodb+srv://aryandhull:sdeassignment@cluster0.ptdinvj.mongodb.net/';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Poll schema and model
const pollSchema = new mongoose.Schema({
  question: String,
  options: [{ text: String }],
  correctAnswerIndex: Number,
  results: Object,
}, { timestamps: true });

const Poll = mongoose.model('Poll', pollSchema);

let activePoll = null;
let studentAnswers = {};
let connectedUsers = {};

app.use(cors({
  origin: '*'
}));

app.use('/socket.io', (req, res) => {
  res.send({ socketio: 'is here!' });
});

// Socket.io event handling
io.on('connection', (socket) => {
  console.log('A user connected');
  connectedUsers[socket.id] = { id: socket.id, name: '' };

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete connectedUsers[socket.id];
  });

  // Handle messages or events from clients
  socket.on('askQuestion', async (pollData) => {
    activePoll = pollData;
    activePoll.id = uuidv4(); // Generate unique ID for the poll
    studentAnswers = {};
    io.emit('askQuestion', activePoll); // Emit 'askQuestion' event to all clients
  });

  // Handle answer submission
  socket.on('submitAnswer', (answer) => {
    const { studentId, selectedOption } = answer;
    studentAnswers[studentId] = selectedOption;

    // Calculate option results
    const optionResults = activePoll.options.map((option, index) => ({
      option: option.text,
      count: Object.values(studentAnswers).filter((studentAnswer) => studentAnswer === index).length,
      totalStudents: Object.values(studentAnswers).length,
    }));

    io.emit('questionResults', { question: activePoll.question, optionResults, correctAnswerIndex: activePoll.correctAnswerIndex });
  });

  // Handle clear screen and ask another question
  socket.on('clearScreen', async () => {
    if (activePoll) {
      const poll = new Poll({ ...activePoll, results: studentAnswers });
      await poll.save();
    }
    activePoll = null;
    studentAnswers = {};
    io.emit('clearScreen');
  });

  socket.on('revealAnswer', (correctAnswerIndex) => {
    io.emit('revealAnswer', correctAnswerIndex);
  });

  // Handle chat messages
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  // Handle kicking out a student
  socket.on('kickStudent', (studentId) => {
    const studentSocket = Object.values(connectedUsers).find(user => user.id === studentId);
    if (studentSocket) {
      io.to(studentSocket.id).emit('kickedOut');
      studentSocket.disconnect();
      delete connectedUsers[studentSocket.id];
      console.log(`Student with ID ${studentId} has been kicked out`);
    } else {
      console.log(`Student with ID ${studentId} not found`);
    }
  });

  // Handle request for past poll results
  socket.on('requestPastPolls', async () => {
    try {
      const pastPolls = await Poll.find().sort({ createdAt: -1 });
      socket.emit('pastPolls', pastPolls);
    } catch (error) {
      console.error('Error fetching past polls:', error);
    }
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
