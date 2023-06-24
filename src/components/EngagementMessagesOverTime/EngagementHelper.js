import { getFormattedDate } from './helper';

const engagementHelper = {
    engagementMessageOverTimeChartOptions: (updatedMessageCountList, updatedChannels) => {
        let messageCountArray = updatedMessageCountList.map((messageObj) => (
            Number(messageObj.count)
        ))
        let datesArray = updatedMessageCountList.map((messageObj) => (
            getFormattedDate(messageObj.timeBucket)
        ));

        let latestMessageWithData = updatedMessageCountList[updatedMessageCountList.length - 1]

        let smallestDate = datesArray[0];
        let largestDateWithData = getFormattedDate(latestMessageWithData?.timeBucket);


        return {
            chart: {
                type: 'spline',
                backgroundColor: '#22222c',
            },
            title: {
                text: 'Highchart'
            },
            xAxis: {
                categories: [...datesArray],
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
            series: [{
                name: 'Count',
                color: '#0a8180',
                data: [...messageCountArray],
            }]
        }
    }
}

export default engagementHelper;