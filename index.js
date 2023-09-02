const express = require('express')
const app = express()
const connectDB = require('./database/connection')
const {Note,noteSchema} = require('./database/noteModel')

connectDB()
app.use(express.json())

app.get('/notes', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
      console.log(notes)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST a new note
  app.post('/notes', async (req, res) => {
    try {
      const { title, content } = req.body;
      const newNote = new Note({ title, content });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error adding note:', error);
      res.status(400).json({ error: 'Bad Request' });
    }
  });
  
  // DELETE a note by ID
  app.delete('/notes/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (deletedNote) {
        res.json(deletedNote);
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // PUT (update) a note by ID
  app.put('/notes/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {
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

  app.get('/notes/search', async (req, res) => {
    const query = req.query.query;
    try {
      const searchResults = await Note.find({
        $or: [{ title: query }, { content: query }],
      });
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search notes' });
    }
  });
  
  app.get('/notes/paginate', async (req, res) => {
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

app.listen(3000, () => {
    console.log("first")
});