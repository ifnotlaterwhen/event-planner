import axios from "axios";

const api = axios.create({
    baseURL: 'https://be-nc-news-8qqi.onrender.com/api'
})

const getAllEvents = (params)=>{
    return api.get('/events',params).then(({data})=>{
        return data.events
    })
}

const getEventById = (id)=>{
    return api.get(`events/${id}`).then(({data})=>{
        return data.event
    })
}

const postNewEvent = (body)=>{
    return api.post(`/events`, body)
    .then(({data})=>{
        data.createdEvent;
    })
}

const patchEventById = (id, body) => {
    return api.patch(`/events/${id}`, body)
        .then(({ data }) => {
            return data.patchedEvent;
        });
};

const deleteEventById = (id)=>{
    return api.delete(`/event/${id}`)
    .then(({data})=>{
        return data.deletedEvent
    });
};

export {getAllEvents, getEventById, postNewEvent, patchEventById, deleteEventById};