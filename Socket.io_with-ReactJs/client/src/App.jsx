import { useState,useEffect } from "react"
import io from "socket.io-client";

const socket = io('http://localhost:5000')

const App = () => {
  const [messages,setMessage] = useState([]);
  const [messageInput,setMessageInput] = useState('');

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessage([...messages,message])
    })

    return()=>{
      socket.off("message");
    }
  },[messages])

  const sendMessage = () =>{
    if(messageInput.trim() !== ""){
      socket.emit("message",messageInput);
      setMessageInput("");
    }
  }

  return (
    <div>
      <h1>Simple Chat App</h1>

      <input type="text" value={messageInput} placeholder="Type your message..." onChange={(e)=>setMessageInput(e.target.value)}></input>

      <button onClick={sendMessage}>Send</button>

      {/* render all the messages */}

      <section>
        {messages.map((message,index)=>(
          <div key={index}>{message}</div>
        ))}
      </section>

    </div>
  )
}

export default App
