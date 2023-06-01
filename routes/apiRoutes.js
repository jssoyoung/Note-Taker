const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // GET Route for a specific note
  router.get('/:note_id', (req, res) => {
    const noteId = req.params.tip_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, note } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        note,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});

module.exports = router;