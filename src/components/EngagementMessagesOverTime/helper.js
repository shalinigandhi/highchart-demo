import { messageCountList } from '../../data';

export const getFormattedDate = (timestamp) => {
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let utcDate = new Date(timestamp);
    let date = utcDate.getDate();
    let monthName = month[utcDate.getMonth()];
    return (date + ' ' + monthName);
}

export const getDateRange = () => {
    const startDate= new Date(
        Math.min(
          ...messageCountList.map(element => {
            return new Date(element.timeBucket);
          }),
        ),
    );
    const endDate = new Date(
        Math.max(
          ...messageCountList.map(element => {
            return new Date(element.timeBucket);
          }),
        ),
    );
    
    const currentDate = new Date(startDate.getTime());
    const dates = [];
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates.map((date) => (
        getFormattedDate(date)
    ))
}