import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import "./FAQChatbot.css";

import { findAnswer } from "./faqAnswers.js";
import FAQAnswer from "./FAQAnswer";

const whatsapp = question => "https://wa.me/14372671257?text=" + encodeURIComponent("Hello Shiva Rudraksha Inc., I have a question: " + question);
export default function FAQChatbot() {
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([{role:"bot",text:"Namaste! Ask me about Rudraksha, wearing, authenticity, care, or shipping. I'll look for an answer in our FAQs."}]);
  const endRef=useRef(null);
  useEffect(()=>{if(open)endRef.current?.scrollIntoView({block:"nearest",behavior:"smooth"});},[open,messages]);
  const submit=(event)=>{
    event.preventDefault();
    const question=input.trim();
    if(!question) return;
    const match=findAnswer(question);
    setMessages(prev=>[...prev,{role:"user",text:question},match?{role:"bot",text:match.answer,source:match.question}:{role:"bot",text:"I couldn't find a confident answer in our FAQs. Please send your question to our team on WhatsApp.",unanswered:question}]);
    setInput("");
  };
  return <div className="faq-chat-widget">
    {open && <section className="faq-chat-panel" role="dialog" aria-label="Shiva Rudraksha FAQ assistant">
      <header className="faq-chat-header"><div><strong>Rudraksha FAQ Assistant</strong><small>Answers from our FAQs</small></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close chat"><X size={19}/></button></header>
      <div className="faq-chat-messages" role="log" aria-live="polite">
        {messages.map((message,index)=><div key={index} className={`faq-chat-message ${message.role}`}>
          {message.source && <small>FAQ: {message.source}</small>}
          <FAQAnswer text={message.text} />
          {message.unanswered && <a href={whatsapp(message.unanswered)} target="_blank" rel="noopener noreferrer">Send Us Your Question <ExternalLink size={14}/></a>}
        </div>)}
        <div ref={endRef}/>
      </div>
      <form className="faq-chat-form" onSubmit={submit}><input aria-label="Ask a Rudraksha question" placeholder="Type your question…" value={input} onChange={e=>setInput(e.target.value)} maxLength={500}/><button type="submit" aria-label="Send question" disabled={!input.trim()}><Send size={18}/></button></form>
      <div className="faq-chat-foot"><a href={whatsapp(input.trim() || "I need help with Rudraksha.")} target="_blank" rel="noopener noreferrer">Ask our team on WhatsApp</a></div>
    </section>}
    <button className="faq-chat-toggle" type="button" aria-label={open?"Close FAQ assistant":"Open FAQ assistant"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={25}/>:<MessageCircle size={27}/>}</button>
  </div>;
}
