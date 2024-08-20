const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const memberRoute = require('./routes/memberRoute');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/member', memberRoute);
app.use('/api/ticket', ticketRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.log(`Error connecting to the database: ${err.message}`));

app.get('/', (req, res) => {
    res.send({ execute: true });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
