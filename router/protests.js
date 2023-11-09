const express = require('express');
const app = express();

app.use(express.json());

function getUpcomingEvents(eventsData, startDate, endDate) {
    const events = eventsData.events;
    const upcomingEvents = [];

    for (const event of events) {
        let eventDate;

        if (event.type === "last_full_week") {
            const currentYear = new Date(startDate).getFullYear();
            const currentMonth = new Date(startDate).getMonth();
            const currentDay = new Date(startDate).getDate();

            // Calculate the date for the start of the last full week
            const lastFullWeekDate = new Date(currentYear, currentMonth, currentDay - 7);

            eventDate = lastFullWeekDate;
        } else if (event.type === "date_range") {
            const startYear = new Date(startDate).getFullYear();
            const startMonth = event.startDate.month;
            const startDay = event.startDate.day;
            eventDate = new Date(startYear, startMonth, startDay);
        } else if (event.type === "day_of_week") {
            const currentYear = new Date(startDate).getFullYear();
            const currentMonth = new Date(startDate).getMonth();
            const currentDay = new Date(startDate).getDate();

            // Calculate the date for the next occurrence of the specified day of the week
            const targetDay = event.day;
            let targetDate = new Date(currentYear, currentMonth, currentDay);
            while (targetDate.getDay() !== targetDay) {
                targetDate.setDate(targetDate.getDate() + 1);
            }

            eventDate = targetDate;
        } else if (event.type === "week_count") {
            const currentYear = new Date(startDate).getFullYear();
            const targetMonth = event.month;
            const targetCount = event.count;

            // Calculate the date for the Nth occurrence of the specified month
            let targetDate = new Date(currentYear, targetMonth, 1);
            let count = 0;
            while (count < targetCount) {
                if (targetDate.getDay() === 0) { // Check if it's a Sunday
                    count++;
                }
                targetDate.setDate(targetDate.getDate() + 1);
            }

            eventDate = targetDate;
        } else if (event.type === "month") {
            // Handle month event, assuming event specifies a whole month
            const currentYear = new Date(startDate).getFullYear();
            const currentMonth = new Date(startDate).getMonth();
            const targetMonth = event.month;
            eventDate = new Date(currentYear, targetMonth, 1);
        } else if (event.type === "one_off") {
            // Parse the date string in the format "YYYY-MM-DD"
            const dateParts = event.date.split("-");
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const day = parseInt(dateParts[2], 10);
            eventDate = new Date(year, month, day);
        }

        // Check if eventDate is within the specified date range
        if (eventDate >= new Date(startDate) && eventDate <= new Date(endDate)) {
            upcomingEvents.push({
                start: eventDate.toISOString().split('T')[0],
                end: eventDate.toISOString().split('T')[0]
            });
        }
    }

    return upcomingEvents;
}



// Define the route to get protest data
app.get('/api/protest/protest', (req, res) => {
    res.json(protests);
});

app.get('/api/protest/upcoming_protests', (req, res) => {
    res.json(protests);
});
app.get('/api/protest/protests', (req, res) => {
    res.json(protests);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});