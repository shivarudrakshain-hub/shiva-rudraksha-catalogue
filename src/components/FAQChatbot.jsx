import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./FAQChatbot.css";

import { getChatReply } from "./faqAnswers.js";
import FAQAnswer from "./FAQAnswer";
import { openLiveChat } from "./faqLiveChat";

export default function FAQChatbot() {
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState("");
  const [connecting,setConnecting] = useState(false);
  const [liveChatOpen,setLiveChatOpen] = useState(false);
  const [chatError,setChatError] = useState("");
  const [messages,setMessages] = useState([{role:"bot",text:"Namaste! Ask me about Rudraksha, wearing, authenticity, care, or shipping. I'll look for an answer in our FAQs."}]);
  const endRef=useRef(null);
  const toggleRef=useRef(null);
  const latestQuestion = [...messages].reverse().find(message => message.role === "user")?.text || "";
  const email = "mailto:shivarudrakshain@gmail.com?subject=" + encodeURIComponent("Website question") + "&body=" + encodeURIComponent(input.trim() || latestQuestion);
  const startLiveChat = useCallback(async (question) => {
    if (connecting) return;
    setConnecting(true);
    setChatError("");
    try {
      await openLiveChat(question, () => {
        setLiveChatOpen(false);
        setOpen(true);
        window.setTimeout(() => toggleRef.current?.focus(), 0);
      });
      setLiveChatOpen(true);
      setOpen(false);
    } catch {
      setChatError("Website chat is unavailable right now. Please try again or email us your question.");
    } finally {
      setConnecting(false);
    }
  }, [connecting]);
  useEffect(() => {
    const request = (event) => {
      setOpen(true);
      startLiveChat(typeof event.detail === "string" ? event.detail : "");
    };
    window.addEventListener("request-live-chat", request);
    return () => window.removeEventListener("request-live-chat", request);
  }, [startLiveChat]);
  useEffect(()=>{if(open)endRef.current?.scrollIntoView({block:"nearest",behavior:"smooth"});},[open,messages]);
  const submit=(event)=>{
    event.preventDefault();
    const question=input.trim();
    if(!question) return;
    setMessages(prev=>[...prev,{role:"user",text:question},getChatReply(question)]);
    setInput("");
  };
  return <div className="faq-chat-widget" hidden={liveChatOpen}>
    {open && <section className="faq-chat-panel" role="dialog" aria-label="Shiva Rudraksha FAQ assistant">
      <header className="faq-chat-header"><div><strong>Rudraksha FAQ Assistant</strong><small>Answers from our FAQs</small></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close chat"><X size={19}/></button></header>
      <div className="faq-chat-messages" role="log" aria-live="polite">
        {messages.map((message,index)=><div key={index} className={`faq-chat-message ${message.role}`}>
          {message.source && <small>FAQ: {message.source}</small>}
          <FAQAnswer text={message.text} />
          {message.unanswered && <button className="faq-live-chat-button" type="button" disabled={connecting} onClick={()=>startLiveChat(message.unanswered)}>{connecting ? "Connecting…" : message.agentRequested ? "Connect to an agent" : "Chat or leave a message"}</button>}
        </div>)}
        <div ref={endRef}/>
      </div>
      <form className="faq-chat-form" onSubmit={submit}><input aria-label="Ask a Rudraksha question" placeholder="Type your question…" value={input} onChange={e=>setInput(e.target.value)} maxLength={500}/><button type="submit" aria-label="Send question" disabled={!input.trim()}><Send size={18}/></button></form>
      {chatError && <div className="faq-chat-foot"><p role="alert">{chatError} <a href={email}>Email our team</a></p></div>}
    </section>}
    <button ref={toggleRef} className="faq-chat-toggle" type="button" aria-label={open?"Close FAQ assistant":"Open FAQ assistant"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={25}/>:<MessageCircle size={27}/>}</button>
  </div>;
}
