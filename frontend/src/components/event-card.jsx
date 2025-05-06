import { Link } from "react-router-dom";
import { useEffect, useState } from "react"

export default function EventCard({ event, isAdmin = false }) {
    return (
        <section key={event.event_id} className="item-card">
            <div>
                {/* Optional placeholder or image field if you add one later */}
                <img
                    height="150px"
                    src="https://via.placeholder.com/150"
                    alt="event placeholder"
                />
            </div>
            <div className="card-list">
                <ul>
                    <Link to={`/events/${event.event_id}`}>
                        <li>
                            <h4>{event.title}</h4>
                        </li>
                    </Link>
                    <li>Category: {event.category}</li>
                    <li>Location: {event.location}</li>
                    <li>Start: {new Date(event.start_time).toLocaleString()}</li>
                    <li>End: {new Date(event.end_time).toLocaleString()}</li>
                    <li>Preview: {event.description?.split(" ").slice(0, 10).join(" ")}...</li>
                    {isAdmin && (
                        <li>
                            <Link to={`/events/${event.event_id}/edit`}>
                                <button>Edit</button>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    );
}