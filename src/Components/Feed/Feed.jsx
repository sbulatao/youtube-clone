import React, { useState, useEffect } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, valueConverter } from '../../data.js'
import axios from 'axios'
import moment from 'moment'

export default function Feed({ category }) {

    const categoryId = Number(category);
    const [videos, setVideos] = useState([]);

    async function fetchVideos(category) {
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category || categoryId}&key=${API_KEY}`);
        setVideos(data.items);
        console.log("Feed data:", data.items);
    }

    useEffect(() => {
        fetchVideos();
    }, [category])

  return (
    <div className="feed">
        {videos.map((video, index) => (
        <Link to={`/video/${video.snippet.categoryId}/${video.id}`} className='card' key={video.id}>
            <div className='card'>
                <img src={video.snippet.thumbnails.medium.url} alt="" />
                <h2>{video.snippet.title}</h2>
                <h3>{video.snippet.channelTitle}</h3>
                <p>{valueConverter(video.statistics.viewCount)} views &bull; {moment(video.snippet.publishedAt).fromNow()}</p>
            </div>
        </Link>
        ))}
    </div>
  )
}
