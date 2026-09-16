import React, { useEffect, useState } from 'react'
import './Recommended.css'
import axios from 'axios'
import { API_KEY } from '../../data'
import { valueConverter } from '../../data'
import { Link } from 'react-router-dom'

export default function Recommended({ categoryId }) {

    const [apiData, setApiData] = useState([]);

    async function fetchData(){
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`);
        setApiData(data.items);
        console.log("recommended data: ", data.items)
    }

    useEffect(() => {
        if(!categoryId || !apiData) return; // STOP if category Id/apiData is not loaded yet
        fetchData();
    }, [categoryId]) // watches categoryId


  return (
    <div className='recommended'>
        {apiData.map((item, index) => (
        <Link to={`/video/${item?.snippet?.categoryId}/${item?.id}`} className="side-video-list" key={item.id}>
            <img src={item?.snippet?.thumbnails?.medium?.url} alt="Recommended Videos" />
            <div className="vid-info">
                <h4>{item?.snippet?.title}</h4>
                <p>{item?.snippet?.channelTitle}</p>
                <p>{valueConverter(item.statistics.viewCount)} views</p>
            </div>
        </Link>
        ))}
    </div>
  )
}
