const format = require('pg-format');
const db = require('../connection');

const seed = (eventData) => {
  return db
    .query(`DROP TABLE IF EXISTS events;`)
    .then(() => {
      return db.query(`
        CREATE TABLE events (
          event_id SERIAL PRIMARY KEY,
          title VARCHAR NOT NULL,
          description TEXT,
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP NOT NULL,
          location VARCHAR NOT NULL,
          category VARCHAR NOT NULL
        );
      `);
    })
    .then(() => {
      const insertEventsQueryStr = format(
        `INSERT INTO events (title, description, start_time, end_time, location, category) VALUES %L RETURNING *;`,
        eventData.map(({ title, description, start_time, end_time, location, category }) => [
          title,
          description,
          start_time,
          end_time,
          location,
          category,
        ])
      );
      return db.query(insertEventsQueryStr);
    });
};

module.exports = seed;
