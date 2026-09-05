import React, { useState, useEffect } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link, useParams } from 'react-router-dom'
import { API_KEY, valueConverter } from '../../data.js'
import axios from 'axios'
import moment from 'moment'

export default function Feed({ category }) {

    const categoryId = Number(category);
    const [videos, setVideos] = useState([]);

    async function fetchVideos(category) {
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category || categoryId}&key=${API_KEY}`);
        setVideos(data.items);
        console.log(data);
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
