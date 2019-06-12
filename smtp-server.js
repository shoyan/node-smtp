//server.js
const SMTPServer = require("smtp-server").SMTPServer;
const {
  simpleParser
} = require('mailparser');

const server = new SMTPServer({
  secure: false,
  // STARTTLSコマンドを無効化
  disabledCommands: ['STARTTLS'],
  authOptional: true,
  // 内容 確認
  onData(source, session, callback) {
    source.pipe(process.stdout);
    simpleParser(source)
      .then(({
        from,to,bcc,cc,subject,text
      }) => {
        console.log({
          from: from.text,
          to: to.text,
          cc: (cc || {text: ''}).text,
          bcc: (bcc || {text: ''}).text,
          subject,
          text: text,
        });
      })
      .catch(err => {
        console.log(err);
      })

    source.on('end', callback);
  }
});

server.listen(5870);

