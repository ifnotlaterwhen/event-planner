export function generateGoogleCalendarUrl({ title, description, location, startTime, endTime }) {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().replace(/[-:]|\.\d{3}/g, '');
    };

    const start = formatDate(startTime);
    const end = formatDate(endTime);

    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    return `${baseUrl}&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
}