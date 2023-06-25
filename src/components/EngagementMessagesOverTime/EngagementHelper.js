import { getFormattedDate } from './helper';

const engagementHelper = {
    engagementMessageOverTimeChartOptions: (updatedMessageCountList, updatedChannels) => {
        let dynamicSeriesList = [];
        let categoriesList = [];

        if (updatedMessageCountList?.length === updatedChannels?.length) {
            updatedMessageCountList.forEach((message, i) => {
                dynamicSeriesList.push({
                    name: updatedChannels[i][0],
                    color: '#0a8180',
                    data: message.map((messageObj) => (
                        Number(messageObj.count)
                    ))
                });
                categoriesList = message.map((messageObj) => (
                    getFormattedDate(messageObj.timeBucket)
                ))
            })
        }
        

        return {
            chart: {
                type: 'spline',
                backgroundColor: '#22222c',
            },
            title: {
                text: 'Highchart'
            },
            xAxis: {
                categories: categoriesList,
                labels: {
                    style: {
                      color: '#616264'
                    }
                },
                tickLength: 10,
                tickWidth: 1,
                lineWidth: 1,
                gridLineWidth: 0,
                tickInterval: 1,
                tickColor: '#616264',
                crosshair: {
                    width: 1,
                    color: '#a8a8ab'
                }
            },
            yAxis: {
                title: {
                    text: 'Y axis'
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#616264'
                    }
                },
                tickLength: 10,
                tickWidth: 1,
                gridLineWidth: 0,
                tickColor: '#616264',
            },
            tooltip: {
                style: {
                    color: '#dadadd'
                },
                shared: true, 
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderColor: '#0a8180',
                borderRadius: 5,
                borderWidth: 1,
                
                formatter: function() {
                    return '<strong>' + this.series.name + '</strong>' + '<br>' + this.y + (this.y > 1 ? ' messages': ' message') + ' on ' + this.x ;
                }
            },
            series: dynamicSeriesList
        }
    }
}

export default engagementHelper;