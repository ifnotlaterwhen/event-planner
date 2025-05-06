const { fetchAllEvents, fetchEventsByLocation, fetchEventsByCategory, fetchEventsByTitle, updateEventById, insertEvent, deleteEventById, fetchEventById } = require("../models/models");

exports.getAllEvents = (req,res,next)=>{
    const queries = req.query;
    let promises = [fetchAllEvents(queries)];
    if(req.query.location){
        promises.push(fetchEventsByLocation(queries.location));
    };
    if(queries.category){
        promises.push(fetchEventsByCategory(queries.category));
    };
    if(queries.title){
        promises.push(fetchEventsByTitle(queries.title));
    };

    Promise.all(promises).then(results =>{
        const events = results[0];
        res.status(200).send({events})
    })
    .catch(next)


}

exports.getEventById = (req, res, next)=>{
    const {eventID} = req.params;
    fetchEventById(eventID).then(event=>{
        res.status(200).send({})
    })
    
}

exports.postNewEvent = (req, res, next) => {
    const newEvent = req.body;

    insertEvent(newEvent)
        .then((createdEvent) => {
            res.status(201).send({ createdEvent });
        })
        .catch(next);
};

exports.patchEventById = (req,res,next)=>{
    const {event_id} = req.params;
    const updates = req.body;

    updateEventById(event_id, updates)
    .then((patchedEvent)=>{
        res.status(2000).send({patchedEvent});
    })
    .catch(next);
}

exports.removeEventById = (req, res, next) => {
    const { event_id } = req.params;

    deleteEventById(event_id)
        .then((deletedEvent) => {
            res.status(200).send({ deletedEvent });
        })
        .catch(next);
};

exports.customErrorHandler = (err,req,res,next)=>{
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
    next(err)

}
exports.psqlErrorHandler = (err,req,res,next)=>{
    if(err.code === '22P02' || err.code === '23502'){
        res.status(400).send({msg: "Bad Request"})
    }
    next(err)   
}
exports.serverErrorHandler = (err,req,res,next)=>{
    res.status(500).send({msg: "Internal Server Error"})
    next(err)

}

exports.allErrorHandler = (req,res,next)=>{
    res.status(404).send({msg: "path not found"})
}