import React from 'react';

import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';
import axios from 'axios';

const logger = new ConsoleLogger('Chime Logs', LogLevel.INFO)
const deviceController = new DefaultDeviceController(logger)

export default class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meeting: 'None',
            attendee: 'None',
            session: '',
            isFullscreen: 'NO'
        };
    }

    componentDidMount() {
        this.getReady();
    }

    getConfigs = async () => {
        let meetData;
        await axios.get('http://localhost:4000/').then(res => {
            meetData = JSON.parse(res.data.body);
            console.log(meetData)
            this.setState({
                meeting: meetData.meeting,
                attendee: meetData.attendee
            })
        });
    }

    connectToChimeMeeting = async () => {
        const meetingConfig = new MeetingSessionConfiguration(this.state.meeting, this.state.attendee)
        const meetingSession = new DefaultMeetingSession(
            meetingConfig,
            logger,
            deviceController
        )

        // TODO --- configure other stuff for the meeting

        console.log('Starting the Chime meeting!')
        await meetingSession.audioVideo.start()

        this.setState({
            session: meetingSession
        })
    }

    displaySharedVideoContent = async (session) => {
        const observer = {
            // :: a tile represents a single instance of shared video content
            videoTileDidUpdate: tile => {
                console.log('Received content with ID:', tile.tileId)

                // :: TODO: get a video element specifically for this tile
                const videoElement = document.getElementById('my-video-element')
                session.audioVideo.bindVideoElement(tile.tileId, videoElement);
            }
        }
       session.audioVideo.addObserver(observer);
    }

    getReady = async () => {
        await this.getConfigs()
        await this.connectToChimeMeeting()
        await this.displaySharedVideoContent(this.state.session)
    }

    render() {
        return (
            <div style={{ background: '#000', display: 'flex', width: '100vw', height: '100vh'}}>
                {/* <h1> CODA CHIME POC </h1>
                <input type='button' onClick={() => this.getConfigs()} style={{ backgroundColor: 'chocolate', color: 'white' }} value='Load confs' />
                <input type='button' onClick={() => this.connectToChimeMeeting()} style={{ backgroundColor: 'chocolate', color: 'white' }} value='Connect chime' />
                <input type='button' onClick={() => this.displaySharedVideoContent(this.state.session)} style={{ backgroundColor: 'chocolate', color: 'white' }} value='Make streamer ready' />  */}
                <video style={{width: '100%', height: '100%'}} id="my-video-element"></video>
            </div>
        )
    }
}
