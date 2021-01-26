import React from 'react'
import videojs from "video.js";
import "videojs-contrib-hls";
import "video.js/dist/video-js.css";

export default class PopVideo extends React.Component {

    constructor(props){
        super(props)
        this.refVideo = React.createRef()
        this.player = null
      }

    initVideoJs = () => {
        this.player = videojs(
          this.refVideo.current,
          {
            language: "zh-CN",
            preload: "auto",
            // controls: false,
            controlBar: {
              children: [{ name: "playToggle" }],
            },
            autoPlay: true,
            muted: true,
          },
          () => {
            this.player.play()
          }
        );
    }

    componentDidMount() {
        this.initVideoJs()
        this.player.src(this.props.videoSrc)
    }

    componentDidUpdate(prevProps) {
        if(this.props.videoSrc != prevProps.videoSrc) {
          this.initVideoJs()
          this.player.src(this.props.videoSrc)
        }
    }

    render() {
        return (
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0, 0.7)',
                    zIndex: 999
                }}
                onClick={(e) => this.props.onShowPopVideo(e, 'PopVideo')}
            >
                <div style={{ margin: 'auto', width: 'auto', height: '100%' }}>
                    {
                        this.props.videoSrc && (
                            <video
                                ref={this.refVideo}
                                duration={2}
                                className="video-js"
                                autoPlay
                                muted
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <source src={this.props.videoSrc} type="application/x-mpegURL"></source>
                            </video>
                        )
                    }
                </div>
            </div>
        )
    }
}