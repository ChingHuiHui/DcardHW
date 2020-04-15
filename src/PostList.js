import React from 'react'
import axios from 'axios'

import PostItem from './components/PostItem';
import Modal from './components/Modal';

import './css/PostList.css'

class PostList extends React.Component{
    
      state={
            id:'', //存放此次的最後1筆資料id(為了待會抓後15個資料)
            before:'', 
            items:[], //所有文章的內容
            post:[], //單一文章內容
            scrolling:false,
            isLoading: false
        }
    

    componentDidMount(){
        this.load()
        this.scrollListener = window.addEventListener('scroll',(e)=>{    
            this.handleScroll(e)
        })
    }

    //如果有參數有id(有點擊postItem)且和上次所傳的參數不同就抓取單一(此id)文章api
    componentDidUpdate(prevProps,prevState){
        var link = this.props.match.params.id
        if(prevProps.match.params.id!==link&&link){
            this.setState({scrolling: true,isLoading:true})
            var url=`https://cors-anywhere.herokuapp.com/https://www.dcard.tw/_apicors/posts/${link}`
            axios.get(url)
            .then(res => {
                this.setState({       
                    post: res.data,
                    isLoading: false
                  });
                }
            )
        }
   
    }

    load = ()=>{
        const {items,before} = this.state
        var url
        //如果有before表示(已經scrolling)要去接往後的資料,沒有則是第一次的前15個
        if(before){
            url=`https://cors-anywhere.herokuapp.com/https://dcard-web-1057.pullup.dcard.io/service/api/v2/posts?popular=true&limit=15&&before=${before}`
        }else{
            url=`https://cors-anywhere.herokuapp.com/https://dcard-web-1057.pullup.dcard.io/service/api/v2/posts?popular=true&limit=15`
        }
        axios.get(url)
        .then(res => {
            this.setState({
                id : res.data[14].id, //存這次接到的最後一筆資料id
                items: [...items,...res.data], 
                scrolling: false
              });
            }
        )
    }
 

    //判斷是否滾動到最下面，並且loadmore
    handleScroll = (e)=>{ 
        const{scrolling} = this.state
        if(scrolling) return;
        const lastItem = document.querySelector('.item:last-child') 
        const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 20
        if(pageOffset>lastItemOffset-bottomOffset){
           this.loadmore()
        }
    }   

    loadmore = (e)=>{
        this.setState({ 
            scrolling: true,
            before: this.state.id //設定為上一次抓api的最後一筆id
        })
        this.load()
    }
 
    render(){
        const {isLoading,post,items,scrolling} = this.state

         //當還在loading時,Modal內為空白
        if(isLoading){
            return( <Modal close={()=>this.setState({scrolling:false})}></Modal>)
        }

        //當loading完 有參數id且有post內容就return Modal(且Modal有內容)
        if(this.props.match.params.id&&post.content){
            var lines = post.content.split(/\n/);
            return(
            <Modal close={()=>this.setState({scrolling:false})}>
                    <p className='postTitle'>{post.title}</p>
                    { lines.map((line,index)=><p key={index} className='postContent'>{line}</p>)}
            </Modal>
            )
        }

        //沒有以上條件，表示正在瀏覽list(顯示目前items有的資料(以postItem表現))
        return( 
        <div className='Contaner'>
           <div className='PostListContainer'>
                {items.map(item=>
                     <div className='item'  key={item.id}>
                       <PostItem
                            id={item.id}
                            gender={item.gender} 
                            createdAt={item.createdAt}
                            forumName={item.forumName}
                            school={item.school}
                            title={item.title} 
                            excerpt={item.excerpt}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            media={item.media[0]}
                         />
                     </div>
                     )      
                    }
                {scrolling?
                    <div className='LoadingItem'>
                        <div className='LoadingItemContent'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                :''}
           </div>
        </div>
        )      
    }
}


export default PostList