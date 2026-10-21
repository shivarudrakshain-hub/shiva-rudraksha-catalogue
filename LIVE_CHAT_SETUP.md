# FAQ to guest live chat

The FAQ assistant still answers from the existing FAQ library. When it cannot
answer, visitors can choose **Chat or leave a message** without a WhatsApp
account. The assistant has no permanent contact shortcut: visitors ask their
question first and receive a handoff button only when no FAQ answer is found.

## Connect the owner's inbox before publishing

1. Create a tawk.to account and a property for `shivarudraksha.in`.
2. In Administration → Channels → Chat Widget, copy the widget embed URL.
   Its shape is `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`.
3. Set those two public IDs in `public/data/live-chat.json`. They are public
   widget identifiers, not passwords or account API keys. Do not paste the entire
   embed script or any secret into this file.
4. In tawk.to, enable the Offline Form with name, required email, and message.
   Keep the widget visible while offline. Enable offline-message email
   notifications for the owner and install/sign into the tawk.to mobile app
   with incoming-chat push notifications enabled.
5. Match the widget colors to maroon `#8b1836`, cream `#fffaf3`, and gold `#b27a28`.
   Availability follows the owner's status/schedule in tawk.to, not WhatsApp.

The embed loads only after the visitor requests a person. Until then FAQ
questions stay in the local assistant. The handoff prefills the last question
where the provider's chat input supports it; the visitor reviews and sends it.
The provider owns its offline form; visitors may need to enter their question
there again. No automatic WhatsApp notifications are included.

The owner-provided widget IDs are connected in this draft. Missing IDs, blocked scripts, or
connection failures keep the FAQ assistant open, show an error, and offer email.
An email link opens the visitor's mail application; it does not itself send mail.

## Verify with the owner's account

- Online: ask an unmatched FAQ, request chat, send a test message, and reply from
  the owner's inbox. Confirm the visitor sees the reply on the website.
- Minimize: confirm the FAQ assistant returns, with its history preserved, and
  reopening live chat preserves the conversation.
- Offline: mark all operators offline, submit the offline form with a test email,
  and confirm the saved message and owner email notification.
- Phone: confirm a new visitor message triggers the owner's app notification.
- Check desktop and narrow/mobile layouts, blocked-script fallback, and FAQ
  matching. Do not publish until these account-dependent checks pass.

References: https://developer.tawk.to/jsapi/,
https://help.tawk.to/article/using-the-offline-form,
https://www.tawk.to/mobile-apps/.
