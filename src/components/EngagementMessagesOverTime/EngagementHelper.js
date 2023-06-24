import { getFormattedDate } from './helper';

const engagementHelper = {
    engagementMessageOverTimeChartOptions: (updatedMessageCountList, updatedChannels) => {
        let dynamicSeriesList = [];
        let categoriesList = [];

        if (updatedMessageCountList?.length === updatedChannels?.length) {
            updatedChannels.forEach((element, i) => {
                dynamicSeriesList.push({
                    name: updatedChannels[i][0],
                    color: '#0a8180',
                    data: updatedMessageCountList[i].map((messageObj) => (
                        Number(messageObj.count)
                    ))
                });
                categoriesList = updatedMessageCountList[i].map((messageObj) => (
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
                      color: '#393d45'
                    }
                },
                tickLength: 10,
                tickWidth: 1,
                lineWidth: 1,
                gridLineWidth: 0,
                tickInterval: 1,
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'Message Count'
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#393d45'
                    }
                },
                tickLength: 10,
                tickWidth: 1,
                gridLineWidth: 0
            },
            tooltip: {
                style: {
                    color: '#ffffff',
                },
                shared: true, 
                backgroundColor: '#000',
                borderColor: '#0a8180',
                borderRadius: 5,
                borderWidth: 1,
                formatter: function() {
                    return this.series.name + '<br>' + this.y + ' messages on ' + this.x ;
                }
            },
            series: dynamicSeriesList
        }
    }
}

export default engagementHelper;