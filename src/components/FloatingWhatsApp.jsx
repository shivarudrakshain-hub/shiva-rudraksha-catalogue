import { MessageCircle, Phone } from "lucide-react";

export default function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href="https://wa.me/14372671257" target="_blank" rel="noreferrer" title="Chat on WhatsApp" aria-label="Chat with Shiva Rudraksha Inc. on WhatsApp">
    <MessageCircle aria-hidden="true" />
    <Phone className="whatsapp-phone-icon" aria-hidden="true" />
  </a>;
}
