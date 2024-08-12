export function formatTime(timestamp:string) {
    const date = new Date(timestamp);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${month} ${day}, ${year}, ${hour}:${minute}:${second} ${ampm}`;
}