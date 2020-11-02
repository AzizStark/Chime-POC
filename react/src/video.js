import React from 'react';
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';
import axios from 'axios';
import { registerIVSTech } from 'amazon-ivs-player';
import videojs from 'video.js'
import '../node_modules/video.js/dist/video-js.css';

export default class Video extends React.Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, {
                techOrder: ["AmazonIVS"]
            }, function onPlayerReady() {
            console.log('onPlayerReady', this)
            this.player.src('https://3bbd23971750.us-east-1.playback.live-video.net/api/video/v1/us-east-1.427956178179.channel.HO6A8jIjfHWt.m3u8');
            this.player.play();
        });
 
        registerIVSTech(videojs);
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js"></video>
                </div>
            </div>
        )
    }
}