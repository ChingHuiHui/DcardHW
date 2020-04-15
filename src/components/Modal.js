import React,{useState,useEffect} from 'react'
import {createPortal} from 'react-dom'
import { useHistory } from "react-router-dom";

const Modal = props=>{
    let history = useHistory();
    const [disable,setDisable] = useState(false)
    
    
    //點擊內容外空白處和按鍵esc就goBack回list(無id)
    const closeModal = ()=>{
        if(!disable){
            setDisable(true)
            history.goBack()
            props.close()
        }
    }

    const escFunction= (e)=>{
        if (e.keyCode === 27&&!disable) {
            setDisable(true)
            history.goBack()
            props.close()
        }
    }

    useEffect(()=>{
        document.addEventListener("keydown", escFunction, false);
        return ()=>{
            document.removeEventListener("keydown", escFunction, false);
        }
    })

    return(
        createPortal(
            <div style={styles.modalStyle} onClick={closeModal}>
                <div    
                    style={styles.modalInner}
                    onClick={(e)=>{e.stopPropagation()}}>
                        {props.children}
                </div>
            </div>
         ,
        document.querySelector('#modal')
       )
    )
}

const styles ={
    modalStyle : {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        left:0,
        top:0,
        backgroundColor: '#001927',
        display:'flex',
        justifyContent: 'center'
    },
    modalInner:{
        width: 650,
        padding: '20px 50px',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#fff'
    }
}


export default Modal