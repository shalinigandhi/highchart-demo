export const getFormattedDate = (timestamp) => {
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let utcDate = new Date(timestamp);
    let date = utcDate.getDate();
    let monthName = month[utcDate.getMonth()];
    return (date + ' ' + monthName);

}