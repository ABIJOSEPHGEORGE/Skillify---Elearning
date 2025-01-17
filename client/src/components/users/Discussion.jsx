import { Input } from '@material-tailwind/react'
import React, { useEffect,useRef,useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import {io} from 'socket.io-client'
import jwt_decode from 'jwt-decode';
import TimeAgo from 'react-timeago'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { details } from '../../config';
import { toast } from 'react-toastify';

function Discussion() {
    const socket = io(`${details.base_url}`);
    const [message,setMessage] = useState('');
    const [discussions,setDiscussions] = useState([])
    const scrollRef = useRef();
    const { id } = useParams()
    
    useEffect(()=>{
        socket.emit('join_discussion',id);
    })

     //joining to the course discussion room
     useEffect(()=>{
        fetchDiscussions(id);
     },[])

     useEffect(()=>{
        //listening to new messages
        socket.on("receive_message",(message)=>{
            setDiscussions([...discussions,message])
        })
     })

     useEffect(() => {
        scrollToBottom();
      }, [message]);
    
      const scrollToBottom = () => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
      };

     //fetch all discussions
     function fetchDiscussions(){
     
        axios.get(`/user/discussions/${id}`)
        .then((res)=>{
            setDiscussions(res.data.results?.messages);
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
     }
    //decode the user from jwt and send
    //Getting the token
    const token = JSON.parse(localStorage.getItem('authKey'));
    const decode = jwt_decode(token);
    const user = decode?.user;
    
    const newDiscussion=()=>{
        socket.emit("send_message",{message:message,courseId:id,student:user});
        setMessage('')
    }
    
  return (
    <div className='w-full font-poppins'>
        <div className="p-5 w-full h-full flex flex-col place-content-between">
            <div className="w-full overflow-y-scroll h-80 scrollbar-hide">
                {
                    discussions?.map((dis,index)=>(
                    <div ref={scrollRef} className={dis.email===user ? 'flex flex-col w-full place-items-end' : 'flex flex-col w-full place-items-start'}>
                        <div className="w-2/5 h-32" key={index}>
                            <div className="w-full bg-lightblue rounded-2xl rounded-tl-none p-3">
                                <h3 className='text-md font-normal'>{dis.message}</h3>
                            </div>
                            <div className="flex place-content-between p-1">
                                <p className='text-sm text=gray-600'>{dis.first_name}</p>
                                <TimeAgo className='text-sm text-gray-600 ' date={dis.createdAt} />
                            </div>
                        </div>
                    </div>
                    ))
                }
                
            </div>
            <div className="w-full flex gap-2 place-items-center">
                <Input type='text' variant='static' value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Discuss something...'/>
                <AiOutlineSend size={20} className=' cursor-pointer' onClick={()=>{newDiscussion()}}></AiOutlineSend>
            </div>
        </div>
    </div>
  )
}

export default Discussion