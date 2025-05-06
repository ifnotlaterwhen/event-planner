const { eventData } = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
    return seed(eventData).then(() => {
        console.log('seeding complete');
        db.end();
    });
};

runSeed();