import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, valueConverter } from '../../data'
import axios from 'axios'
import moment from 'moment'

export default function PlayVideo({ videoId }) {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);

    // 1. fetch video data when componenet mounts or videoId changes
    async function fetchVideoData() { // fetching video data
            const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`);
            setApiData(data.items[0]);
            console.log("video data: ",data.items[0])
    }

    // 2. fetch channel data ONLY after apiData becomes available
    async function fetchOtherData() { // fetching channel data
            const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`);
            setChannelData(data.items[0]);
            console.log("channel data: ", data.items[0]);
    }

    
    useEffect(() => {
        if(videoId) fetchVideoData();
    }, [videoId]) // Add videoId HERE so it refetches if user switches videos

    useEffect(() => {
        if(!apiData || !apiData.snippet?.channelId) return; // STOP if apiData/channelId isn't loaded yet

        fetchOtherData();
    },[apiData]) // watches apiData and starts as soon as it updates


  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        <h3>{apiData ? apiData?.snippet?.title : "Title Here"}</h3>

        <div className="play-video-info">
            <p>{valueConverter(apiData ? apiData?.statistics?.viewCount : "0K")} Views &bull; {apiData ? moment(apiData?.snippet?.publishedAt).fromNow() : "0 hours ago"}</p>
            <div>
                <span><img src={like} alt="" /> {apiData ? valueConverter(apiData.statistics.likeCount) : 0}</span>
                <span><img src={dislike} alt="" /> </span>
                <span><img src={share} alt="" /> Share</span>
                <span><img src={save} alt="" /> Save</span>
            </div>
        </div>
        
        <hr />

        <div className="publisher">
            <img src={channelData ? channelData?.snippet?.thumbnails?.default?.url : ""} alt="" />
            <div>
                <p>{channelData ? channelData?.snippet?.title : ""}</p>
                <span>{channelData ? valueConverter(channelData?.statistics?.subscriberCount) : "1M"} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>

        <div className="vid-description">
            <p>{apiData ? apiData?.snippet?.description.slice(0, 250) : "Description Here"}</p>
            <hr />
            <h4>{apiData ? valueConverter(apiData.statistics.commentCount) : 102} Comments</h4>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

            <div className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>A global computer network providing a variety of information and interconnected networks using standardized communication protocol.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
