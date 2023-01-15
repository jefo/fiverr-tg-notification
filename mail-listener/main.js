import ImapFlow from "imapflow";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
// imap
const imap = new ImapFlow({
  host: "imap.example.com",
  port: 993,
  secure: true,
  auth: {
    user: "username",
    pass: "password",
  },
});

// прослушивание входящих сообщений
(async () => {
  await imap.connect();
  const mailbox = await imap.selectMailbox("INBOX");
  imap.keepalive();
  imap.on("new", async (event) => {
    if (event.type === "message") {
      const message = await imap.fetch(event.id, {
        bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)", "TEXT"],
      });
      let messageData = message.parts.filter((part) => {
        return part.which === "HEADER.FIELDS (FROM TO SUBJECT DATE)";
      });
      let messageText = message.parts.filter((part) => {
        return part.which === "TEXT";
      });
      // обработка сообщения
    }
  });
})();
