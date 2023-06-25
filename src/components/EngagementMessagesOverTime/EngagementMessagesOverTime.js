import React, { useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { messageCountList, channels } from '../../data';

const EngagementMessagesOverTime = () => {
    const [updatedMessageCountList, setUpdatedMessageCountList] = useState([]);
    const [updatedChannels, setUpdatedChannels] = useState([]);

    React.useEffect(() => {
        let uniqueChannelIds = [];
        let duplicateChannelIds = [];

        messageCountList.forEach((message) => {
            if (!uniqueChannelIds.includes(message.channelId)) {
                uniqueChannelIds.push(message.channelId);
            } else {
                if (!duplicateChannelIds.includes(message.channelId)) {
                    duplicateChannelIds.push(message.channelId)
                }
            }
        })

        getUpdatedData(duplicateChannelIds);
    }, [])


    const getUpdatedData = (duplicateChannelIds) => {
        let finalMsgArray = [];
        let finalChannelArray = [];

        duplicateChannelIds.forEach((dupChannelId) => { 
            let tempMessageArray = messageCountList.filter((messageObj) => (
                dupChannelId.includes(messageObj.channelId)
            ));

            let tempChannelArray = channels.filter((channel) => (
                dupChannelId.includes(channel.id)
            )).map((channel) => (
                channel.label
            ));
            
            finalMsgArray.push(tempMessageArray);
            finalChannelArray.push(tempChannelArray);
        });

        setUpdatedMessageCountList(finalMsgArray);
        setUpdatedChannels(finalChannelArray);
    }

    const options = engagementHelper.engagementMessageOverTimeChartOptions(updatedMessageCountList, updatedChannels);
	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime;
