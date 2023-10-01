const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./database/connection')
const {Note} = require('./database/noteModel')

connectDB()
app.use(express.json())
app.use(cors())

app.get('/todos', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST a new note
  app.post('/todos', async (req, res) => {
    try {
      const { text, day , finished } =  req.body;
      const newNote = await Note.create({ text, day , finished });
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error adding note:', error);
      res.status(400).json(error);
    }
  });
  
  // DELETE a note by ID
  app.delete('/todos/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (deletedNote) {
        res.json(deletedNote);
        res.status(200)
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // PUT (update) a note by ID
  app.put('/todos/:id', async (req, res) => {
    try {
      const { text, day , finished } =  req.body;
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, {text, day, finished }, {
        new: true,
      });
      if (updatedNote) {
        res.json(updatedNote);
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/todos/search', async (req, res) => {
    const query = req.query.query;
    try {
      const searchResults = await Note.find({
        $or: [{ text: query }, { day: query }, { finished: query }],
      });
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search notes' });
    }
  });
  
  app.get('/todos/paginate', async (req, res) => {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
  
    try {
      const notes = await Note.find().skip(skip).limit(limit);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve paginated notes' });
    }
  });

app.listen(5000, () => {
    console.log("first")
});