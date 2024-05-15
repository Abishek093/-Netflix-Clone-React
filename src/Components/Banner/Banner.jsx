import React, { useEffect, useState } from 'react'
import './Banner.css'
import { API_KEY, imagUrl} from '../../constants/constants'
import axios from '../../axios'

function Banner() {
  const [movie, setMovie] = useState()
  const random=Math.floor(Math.random()*20)

  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)  
    .then((response)=>{
      setMovie(response.data.results[random])
      // console.log(response.data.results);
    })
  },[])

  return (
    <div className='banner' style={{backgroundImage:`url(${ movie ? imagUrl+movie.backdrop_path : ""})`}}>
      <div className='content'>
      <h1 className='title'>{movie ? (movie.title || movie.name || "") : ""}</h1>
        <div className='bannerButtons'>
            <button className='button'>Play</button>
            <button className='button'>My list</button>
        </div>
        <h1 className='discription'>{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner
