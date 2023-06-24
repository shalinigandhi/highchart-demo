import { getDateRange, getFormattedDate } from './helper';

const engagementHelper = {
    engagementMessageOverTimeChartOptions: (updatedMessageCountList, updatedChannels) => {
        let messageCountArray = updatedMessageCountList.map((messageObj) => (
            Number(messageObj.count)
        ))

        let dates = updatedMessageCountList.map((messageObj) => (
            getFormattedDate(messageObj.timeBucket)
        ))

        console.log(updatedChannels);

        return {
            chart: {
                type: 'spline',
                backgroundColor: '#22222c',
            },
            title: {
                text: 'Highchart'
            },
            xAxis: {
                categories: [...dates],
                labels: {
                    style: {
                      color: '#393d45'
                    }
                },
                tickLength: 10,
                tickWidth: 1,
                lineWidth: 1,
                gridLineWidth: 0
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
            series: [{
                name: updatedChannels && updatedChannels.length && updatedChannels[0].name,
                color: '#0a8180',
                data: [...messageCountArray],
            }]
        }
    }
}

export default engagementHelper;