import React from 'react'
import {Link} from 'react-router-dom' 

import '../css/PostItem.css'
const PostItem = props =>{
    const date = new Date(props.createdAt)
    const createdAt = date.toLocaleDateString(undefined,{month:'long',day:'numeric'})
    const createdAt2 = date.toLocaleTimeString(undefined,{hour12:false,hour: '2-digit', minute: '2-digit'})

    return(
        <Link to={`/${props.id}`}  className='linkStyle'>
          <div className='postItem'>
            <div className='dataContainer'>
                <div className={`gender ${props.gender}`}></div>
                    <p className='dataText dot'>{props.forumName}</p>
                    <p className='dataText dot'>{props.school?props.school:'匿名'}</p>
                    <p className='dataText'><span>{createdAt}</span><span>{createdAt2}</span></p>
                    <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className='contentContainer'>
                <div className='titleContainer'>
                    <h3>{props.title}</h3>
                    <p className='description'>{props.excerpt}</p> 
                    <div className='commentContainer'>
                        <p>
                            <img 
                                alt='reaction' 
                                src='https://gcs.dcard.tw/reaction/286f599c-f86a-4932-82f0-f5a06f1eca031539599210825.png'/>
                            {props.likeCount}
                        </p>
                        <p>回應 {props.commentCount}</p>
                        <p><i className="fas fa-bookmark"></i>收藏</p>
                    </div>
                </div>
               {typeof props.media=='object'?(
               <div style={{height:84,width:84,backgroundImage:`url(${props.media.url})`,backgroundSize:'cover',borderRadius:5}}>
                </div>):''}
             </div>
            </div>
        </Link>
    )
}

export default PostItem