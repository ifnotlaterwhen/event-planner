import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/api";
import { generateGoogleCalendarUrl } from "../utils/calendar";
import Error from "./error";

export default function EventDetails() {
    const { event_id } = useParams();
    const [event, setEvent] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        getEventById(event_id)
            .then((data) => {
                setEvent(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setError(error);
                setIsLoading(false);
            });
    }, [event_id]);

    if (isLoading)
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );

    if (isError) return <Error error={error} />;

    const calendarUrl = generateGoogleCalendarUrl({
        title: event.title,
        description: event.description,
        location: event.location,
        startTime: event.start_time,
        endTime: event.end_time,
    });

    return (
        <section key={event.event_id} className="event-details">
            <div>
                <img
                    height="300px"
                    src="https://via.placeholder.com/300"
                    alt="event image"
                />
            </div>
            <div className="card-list">
                <h3>{event.title}</h3>
                <ul>
                    <li>Category: {event.category}</li>
                    <li>Location: {event.location}</li>
                    <li>Start: {new Date(event.start_time).toLocaleString()}</li>
                    <li>End: {new Date(event.end_time).toLocaleString()}</li>
                </ul>
                <p>{event.description}</p>
                <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
                    <button>Add to Google Calendar</button>
                </a>
            </div>
        </section>
    );
}
