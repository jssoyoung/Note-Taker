const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    console.log(req.body);

    const { title, note } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        note,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, '../db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});

module.exports = router;