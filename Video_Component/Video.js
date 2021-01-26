import React from 'react'
import videojs from "video.js";
import "videojs-contrib-hls";
import "video.js/dist/video-js.css";
import _ from 'lodash'
import axios from 'axios'
import PopVideo from './PopVideo'

export default class Video extends React.Component {

    constructor(props){
      super(props)
      this.refVideo = React.createRef()
      this.player = null
      this.state = {
        isShowPopVideo: false,
        notText: '资源不可用/刷新重试',
        videoSrc: null
      }
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
          // this.player.on("error", () => {
          //   this.player.errorDisplay.close();
          // })
          // this.player.on('suspend', function() {//延迟下载
          //   console.log("延迟下载")
          // });
          // this.player.on('loadstart', function() { //客户端开始请求数据
          //     console.log("客户端开始请求数据")
          // });
          // this.player.on('progress', function() {//客户端正在请求数据
          //     console.log("客户端正在请求数据")
          // });
          // this.player.on('abort', function() {//客户端主动终止下载（不是因为错误引起）
          //     console.log("客户端主动终止下载")
          // });
          // this.player.on('error', function() {//请求数据时遇到错误
          //     console.log("请求数据时遇到错误")
          // });
          // this.player.on('stalled', function() {//网速失速
          //     console.log("网速失速")
          // });
          // this.player.on('play', function() {//开始播放
          //     console.log("开始播放")
          // });
          // this.player.on('pause', function() {//暂停
          //     console.log("暂停")
          // });
          // this.player.on('loadedmetadata', function() {//成功获取资源长度
          //     console.log("成功获取资源长度")
          // });
          // this.player.on('loadeddata', function() {//渲染播放画面
          //     console.log("渲染播放画面")
          // });
          // this.player.on('waiting', () => {//等待数据，并非错误
          //     console.log("等待数据")
          // });
          // this.player.on('playing', () => {//开始回放
          //     console.log("开始回放")
          // });
          // this.player.on('canplay', function() {//可以播放，但中途可能因为加载而暂停
          //     console.log("可以播放，但中途可能因为加载而暂停")
          // });
          // this.player.on('canplaythrough', function() { //可以播放，歌曲全部加载完毕
          //     console.log("可以播放，歌曲全部加载完毕")
          // });
          // this.player.on('seeking', function() { //寻找中
          //     console.log("寻找中")
          // });
          // this.player.on('seeked', function() {//寻找完毕
          //     console.log("寻找完毕")
          // });
          // this.player.on('timeupdate', function() {//播放时间改变
          //     console.log("播放时间改变")
          // });
          // this.player.on('ended', function() {//播放结束
          //     console.log("播放结束")
          // });
          // this.player.on('ratechange', function() {//播放速率改变
          //     console.log("播放速率改变")
          // });
          // this.player.on('durationchange', function() {//资源长度改变
          //     console.log("资源长度改变")
          // });
          // this.player.on('volumechange', function() {//音量改变
          //     console.log("音量改变")
          // });
        }
      );
      
    }

    getPlayerUrl = async ({ sbbh = null }) => {
      if(!sbbh) return
      let result = null
      let url = null
      result = await axios.post(
          "http://bigdata.cn.gov:8080/visdata/rest/sign/signservice/body/data",
          [
              {
                distrcit: "05",
                town: "",
                url: "",
                type: "application/x-mpegURL",
                code: sbbh
              }
          ]
      )
      .then((response) => {  
        if (response.status === 200) {
          url = JSON.parse(response.data.result)[0].url;
        }
        return url
      })
      .catch(function (error) {
          return null
      });
      if(!!result) {
        this.setState({
          videoSrc: result
        })
      } else {
        this.setState({
          notText: this.props.notText
        })
      }
    }

    componentDidMount() {
      this.getPlayerUrl(this.props)
      this.setState({
        notText: '资源加载中...'
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.sbbh != prevProps.sbbh) {
        this.getPlayerUrl(this.props)
      }
      if(this.state.videoSrc != prevState.videoSrc) {
        this.initVideoJs()
        this.player.src(this.state.videoSrc)
      }
    }


    componentWillUnmount() {
      if (this.player) {
        this.player.dispose()
      }
    }

    onShowPopVideo = (e, type) => {
      e.stopPropagation()
      if(type === 'video' && !this.state.videoSrc) return;
      this.setState(state => {
        return {
          isShowPopVideo: !state.isShowPopVideo
        }
      })
    }

    render () {
      return (
        <div
          style={{ margin: 'auto', width: '100%', height: '100%'}}
        >
          <div
            style={{ overflow: "hidden", width: '100%', height: '100%', maxheight: 548, backgroundColor: '#000'}}
          >
            {this.state.videoSrc ? (
                  <video
                    onClick={(e) => this.onShowPopVideo(e, 'video')}
                    ref={this.refVideo}
                    duration={2}
                    // id={this.props.ID + "camlab"}
                    className="video-js"
                    // height={720}
                    autoPlay
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: `scale(${this.props.scaleNum})`,
                      cursor: 'pointer'
                    }}
                  >
                    <source src={this.state.videoSrc} type="application/x-mpegURL"></source>
                  </video>
            ) : (
              <div
                style = {{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#444444'
                }}
              >
                {this.state.notText}
              </div>
            )}
            </div>
            {
              this.state.isShowPopVideo && <PopVideo videoSrc={this.state.videoSrc} onShowPopVideo={this.onShowPopVideo}/> 
            }
          </div>
      )
    }
  

}
