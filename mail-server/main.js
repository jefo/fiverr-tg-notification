import * as dotenv from 'dotenv';
dotenv.config();
import { SMTPServer } from "smtp-server";

const host = process.env.HOST;
const port = process.env.PORT;

const options = {
  // secure: true,
  // key: fs.readFileSync('path/to/privkey.pem'),
  // cert: fs.readFileSync('path/to/cert.pem'),
  // ca: fs.readFileSync('path/to/chain.pem')
};

const server = new SMTPServer({
  // set your host
  host,
  // set your port
  port,
  // authenticate the user
  authOptional: true,
  // set your custom handler for incoming mails
  onData: (stream, session, callback) => {
    // do something with the incoming mail
    console.log("Received message from:", session.envelope.mailFrom.address);
    console.log("Received message to:", session.envelope.rcptTo[0].address);
    // callback to end the current message
    callback();
  },
  ...options,
});

server.listen(port, () => {
  console.log("SMTP server is listening on port", server.server.address().port);
});
