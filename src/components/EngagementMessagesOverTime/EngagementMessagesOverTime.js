import React, { useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { messageCountList, channels } from '../../data';
import engagementHelper from "./EngagementHelper";

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
        setUpdatedMessageCountList(messageCountList.filter((messageObj) => (
            duplicateChannelIds.includes(messageObj.channelId)
        )));
        setUpdatedChannels(channels.filter((channel) => (
            duplicateChannelIds.includes(channel.id)
        )))
    }

    const options = engagementHelper.engagementMessageOverTimeChartOptions(updatedMessageCountList, updatedChannels);
	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime;
