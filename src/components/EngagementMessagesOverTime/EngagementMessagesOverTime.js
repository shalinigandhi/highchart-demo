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
        for (let i = 0; i < messageCountList.length; i++) {
            if (!uniqueChannelIds.includes(messageCountList[i].channelId)) {
                uniqueChannelIds.push(messageCountList[i].channelId);
            } else {
                if (!duplicateChannelIds.includes(messageCountList[i].channelId)) {
                    duplicateChannelIds.push(messageCountList[i].channelId)
                }
            }
        }
        getUpdatedData(duplicateChannelIds);
    }, [])


    const getUpdatedData = (duplicateChannelIds) => {
        let tempFinalMsgArray = [];
        let tempFinalChannelArray = [];

        duplicateChannelIds.forEach(dupChannelId => { 
            let tempMessageArray = messageCountList.filter((messageObj) => (
                dupChannelId.includes(messageObj.channelId)
            ));

            let tempChannelArray = channels.filter((channel) => (
                dupChannelId.includes(channel.id)
            )).map((channel) => (
                channel.label
            ));
            
            tempFinalMsgArray.push(tempMessageArray);
            tempFinalChannelArray.push(tempChannelArray);
        });

        setUpdatedMessageCountList(tempFinalMsgArray);
        setUpdatedChannels(tempFinalChannelArray);
    }

    const options = engagementHelper.engagementMessageOverTimeChartOptions(updatedMessageCountList, updatedChannels);
	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime;
