const Week = require("../models/weekSchema")

// Helper function to find or create the Week doc
async function findOrCreateWeek(date, user_id) {
    const startOfWeek = getWeekStart(date);
    const endOfWeek = getWeekEnd(date);
    const weekNumber = getWeekNumber(date)
    let week = await Week.findOne({ user_id, startWeek: startOfWeek, endWeek: endOfWeek });

    if (!week) {
        // Create a new Week document if it doesn't exist
        week = await Week.create({
            weekNum: weekNumber,
            startWeek: startOfWeek,
            endWeek: endOfWeek,
            user_id,
        });
    }
    return week;
}


//helper function to calculate week number based on date
function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(),0,1) // January 1st of the date
    // console.log("start of the year", startOfYear)
    const pastDaysOfYear = (date - startOfYear) / (24 * 60 * 60 * 1000); // calc days passed since start of the year
    // console.log("date " , date , ' - ', " start of year", startOfYear , '=', date-startOfYear);
    
    // console.log("past Days Of the year", pastDaysOfYear)
    // console.log("startOfYear.getDay()", startOfYear.getDay())
    
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7); //get day method returns number representing a day, (0 = sunday, 6 = saturday)
}

//helper function to calculate start time of the week based on date
function getWeekStart(date) {
    const dayNum = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - dayNum);
    weekStart.setHours(0, 0, 0, 0); // Set time to midnight
    return weekStart
}


//helper function to calculate the end time of the week based on date
function getWeekEnd(date) {
    const weekStart = getWeekStart(date)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999); // Set to end of day
    return weekEnd
}


const date = new Date('2024-11-09'); // Example date
const weekNumber = getWeekNumber(date);
const weekStart = getWeekStart(date);
const weekEnd = getWeekEnd(date);
// console.log(`The week number is: ${weekNumber}`);
// console.log(`the week start is: ${weekStart}`);
// console.log(`the week end is: ${weekEnd}`);
// console.log("week start type", typeof(weekStart));
// console.log("week end type", typeof(weekEnd));


module.exports = { findOrCreateWeek };