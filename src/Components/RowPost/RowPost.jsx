import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, imagUrl } from '../../constants/constants'
import YouTube from "react-youtube";

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, seturlId] = useState('')

  useEffect(()=>{
    axios.get(props.url)
    .then(response=>{
      console.log(response.data);
      setMovies(response.data.results)
    }).catch(err=>{
      // alert('Network Error')
    })
  },[])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie=(id)=>{{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then(response=>{
      console.log(response.data)
      if(response.data.results.length !== 0){
        seturlId(response.data.results[0])
      }
    })
  }}
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>
         <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster'  : 'poster' }  alt='Posters' src={`${imagUrl}${obj.backdrop_path}`} />
        )}
      
      </div>
      { urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost
