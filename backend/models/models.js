const db = require('../db/connection.js');

exports.fetchAllEvents = ({sort_by = 'startTime', order = 'asc', ...rest})=>{
    const sortColumns = ['startTime', 'title', 'location', 'category'];
    const orderOptions = ['asc', 'desc','ASC','DESC'];

    if(!sortColumns.includes(sort_by) || !orderOptions.includes(order)){
        return Promise.reject({status: 400, msg: 'Bad Request'})
    }

    let queryStr = `SELECT events.event_id,
    events.title,
    events.description,
    events.startTime,
    events.endTime,
    events.location,
    events.category,
    events.event_img_url 
    FROM events`

    if(rest.location){
        queryStr += ` WHERE events.location = '${rest.location}'`
    }
    if(rest.category){
        queryStr += rest.location? ` AND events.category = '${rest.category}'` : ` WHERE events.category = '${rest.category}'`
    }
    if(rest.title){
        queryStr += rest.location || rest.category? `AND events.title ILIKE '%${rest.title}%'` : ` WHERE events.title ILIKE '%${rest.title}%'`
    }

    queryStr += ` ORDER BY ${sort_by} ${order.toUpperCase()}`

    return db.query(queryStr)
    .then(({rows}) =>{
        return rows;
    })
}

exports.fetchEventById = (id) => {
    return db.query(`SELECT * FROM events WHERE event_id = $1;`, [id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Event not found' });
            }
            return rows[0];
        });
};

exports.fetchEventsByLocation = (location) => {
    return db.query (`SELECT * FROM events
        WHERE location LIKE $1`, [`%${location}%`])
        .then(({rows})=>{
            if(rows.length === 0){
                return Promise.reject({status: 404, msg: 'No events found'});
            }
            return rows[0];
        })
}
exports.fetchEventsByCategory = (category) => {
    return db.query (`SELECT * FROM events
        WHERE category LIKE $1`, [`%${category}%`])
        .then(({rows})=>{
            if(rows.length === 0){
                return Promise.reject({status: 404, msg: 'No events found'});
            }
            return rows[0];
        })
}
exports.fetchEventsByTitle = (title) => {
    return db.query (`SELECT * FROM events
        WHERE title LIKE $1`, [`%${title}%`])
        .then(({rows})=>{
            if(rows.length === 0){
                return Promise.reject({status: 404, msg: 'No events found'});
            }
            return rows[0];
        })
}

exports.updateEventById = (eventId, patchBody) => {
    if (!eventId || Object.keys(patchBody).length === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    const allowedFields = ['title', 'description', 'start_time', 'end_time', 'location', 'category'];
    const keys = Object.keys(patchBody).filter((key) => allowedFields.includes(key));


    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map((key) => patchBody[key]);

    const queryStr = `
        UPDATE events
        SET ${setClauses}
        WHERE event_id = $${keys.length + 1}
        RETURNING *;
    `;

    return db.query(queryStr, [...values, eventId])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Event not found" });
            }
            return rows[0];
        });
};

exports.insertEvent = (newEvent) => {
    const { title, description, start_time, end_time, location, category } = newEvent;

    if (!title || !start_time || !end_time || !location || !category) {
        return Promise.reject({ status: 400, msg: "Missing required fields" });
    }

    const queryStr = `
        INSERT INTO events (title, description, start_time, end_time, location, category)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const values = [title, description || '', start_time, end_time, location, category];

    return db.query(queryStr, values)
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.deleteEventById = (eventId) => {
    if (!eventId) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }

    return db.query(`DELETE FROM events WHERE event_id = $1 RETURNING *;`, [eventId])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Event not found" });
            }
            return rows[0];
        });
};