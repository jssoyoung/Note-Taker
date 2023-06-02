const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {return res.json(JSON.parse(data))});
  });

  // PUT Route to call on the notes and have them appear on the right side column
router.put('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((data) => data.id === noteId); 
      return result.length > 0
      ? res.json(result)
      : res.json('No note with that ID');
    });
  });

  // POST Route to save notes into the ds.json
router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});

module.exports = router;