import React from 'react'
import { useNavigate } from 'react-router-dom'

const Post = () => {
    const navigate = useNavigate()
  return (
    <div>Post

    <div><button onClick={()=>navigate('/')}>Home</button></div>
    </div>
  )
}

export default Post