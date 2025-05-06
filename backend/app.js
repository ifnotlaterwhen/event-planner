const express = require('express');
const { getAllEvents, patchEventById, postNewEvent, removeEventById, psqlErrorHandler, customErrorHandler, serverErrorHandler, allErrorHandler, getEventById } = require('./controllers/controllers.js');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.get('/api/events', getAllEvents);

app.get('api/events/:event_id', getEventById);

app.post('/api/events', postNewEvent);

app.patch('api/events/:event_id', patchEventById);

app.delete('api/events/:event_id', removeEventById);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

app.all('*', allErrorHandler);

module.exports = app