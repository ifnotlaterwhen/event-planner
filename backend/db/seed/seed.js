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
          startTime TIMESTAMP NOT NULL,
          endTime TIMESTAMP NOT NULL,
          location VARCHAR NOT NULL,
          category VARCHAR NOT NULL,
          event_img_url VARCHAR
        );
      `);
    })
    .then(() => {
      const insertEventsQueryStr = format(
        `INSERT INTO events (title, description, startTime, endTime, location, category) VALUES %L RETURNING *;`,
        eventData.map(({ title, description, startTime, endTime, location, category }) => [
          title,
          description,
          startTime,
          endTime,
          location,
          category,
        ])
      );
      return db.query(insertEventsQueryStr);
    });
};

module.exports = seed;
