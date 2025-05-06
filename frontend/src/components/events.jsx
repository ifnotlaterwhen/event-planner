import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllEvents } from "../api/api";
import EventCard from "./event-card";
import Filter from "./filter";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [searchParams] = useSearchParams();

    let params = undefined;
    if (searchParams.get("category")) {
        params = { params: { category: searchParams.get("category") } };
    }

    useEffect(() => {
        getAllEvents(params)
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchParams]);

    return (
        <div className="card-list-container" id="item-list">
            <h2>Events</h2>
            <div>
                <Filter setEvents={setEvents} />
            </div>
            <ul className="card-list">
                {events.map((event) => {
                    return <EventCard key={event.event_id} event={event} />;
                })}
            </ul>
        </div>
    );
}