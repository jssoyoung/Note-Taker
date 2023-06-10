const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

const PORT = process.env.PORT || 3001;

// Uses express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets static website to contain code in public folder
app.use(express.static('public'));

// Links to the different routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Will display on console log 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);

