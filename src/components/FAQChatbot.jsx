import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import "./FAQChatbot.css";

import { getChatReply } from "./faqAnswers.js";
import FAQAnswer from "./FAQAnswer";

export default function FAQChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    role: "bot",
    text: "Namaste! Ask me about Rudraksha mukhis (1–21 Mukhi), astrological recommendations, custom malas, authenticity, care rituals, or order shipping."
  }]);
  const endRef=useRef(null);
  const toggleRef=useRef(null);
  const latestQuestion = [...messages].reverse().find(message => message.role === "user")?.text || "";
  const email = "mailto:shivarudrakshain@gmail.com?subject=" + encodeURIComponent("Website question") + "&body=" + encodeURIComponent(input.trim() || latestQuestion);

  useEffect(() => {
    const request = (event) => {
      const q = typeof event.detail === "string" ? event.detail : "";
      window.open(`https://wa.me/14372671257?text=${encodeURIComponent(q ? `Hello Shiva Rudraksha Inc., I have a question: ${q}` : "Hello Shiva Rudraksha Inc., I would like to consult with you.")}`, "_blank");
    };
    window.addEventListener("request-live-chat", request);
    return () => window.removeEventListener("request-live-chat", request);
  }, []);
  useEffect(()=>{if(open)endRef.current?.scrollIntoView({block:"nearest",behavior:"smooth"});},[open,messages]);
  const submit=(event)=>{
    event.preventDefault();
    const question=input.trim();
    if(!question) return;
    setMessages(prev=>[...prev,{role:"user",text:question},getChatReply(question)]);
    setInput("");
  };
  return <div className="faq-chat-widget">
    {open && <section className="faq-chat-panel" role="dialog" aria-label="Shiva Rudraksha FAQ assistant">
      <header className="faq-chat-header"><div><strong>Rudraksha Knowledge Assistant</strong><small>Vedic Guidance • WhatsApp +1 437-267-1257</small></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close chat"><X size={19}/></button></header>
      <div className="faq-chat-messages" role="log" aria-live="polite">
        {messages.map((message,index)=><div key={index} className={`faq-chat-message ${message.role}`}>
          {message.source && <small className="faq-source-badge">{message.category ? `${message.category} • ${message.source}` : `FAQ: ${message.source}`}</small>}
          <FAQAnswer text={message.text} />
          {message.productUrl && <a href={message.productUrl} className="faq-chat-product-link" onClick={()=>{setOpen(false);if(message.productUrl.startsWith("#")){window.location.hash=message.productUrl.slice(1);}}}>View in Collection →</a>}
          {message.unanswered && (
            <a
              href={`https://wa.me/14372671257?text=${encodeURIComponent(
                message.agentRequested
                  ? `Hello Shiva Rudraksha Inc., I would like to speak directly with your team about: ${message.unanswered}`
                  : `Hello Shiva Rudraksha Inc., I have a question about: ${message.unanswered}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-whatsapp-handoff-button"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span>Discuss on WhatsApp (+1 437-267-1257)</span>
            </a>
          )}
        </div>)}
        <div ref={endRef}/>
      </div>
      <form className="faq-chat-form" onSubmit={submit}><input aria-label="Ask a Rudraksha question" placeholder="Type your question…" value={input} onChange={e=>setInput(e.target.value)} maxLength={500}/><button type="submit" aria-label="Send question" disabled={!input.trim()}><Send size={18}/></button></form>
      <div className="faq-chat-foot"><p>Direct consultation: <a href="https://wa.me/14372671257" target="_blank" rel="noopener noreferrer">WhatsApp +1 437-267-1257</a> • <a href={email}>Email</a></p></div>
    </section>}
    <button ref={toggleRef} className="faq-chat-toggle" type="button" aria-label={open?"Close FAQ assistant":"Open FAQ assistant"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={25}/>:<MessageCircle size={27}/>}</button>
  </div>;
}
