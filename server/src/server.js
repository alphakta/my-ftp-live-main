import { createServer } from "net";
import * as serverCommands from './serverCommands'

export function launch(port) {
  
  const server = createServer({ host: 'localhost' },(socket) => {
    console.log("new connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      console.log(command, args);

      switch(command) {
        case "USER":
          serverCommands.USER(socket, args)
          break;
        case "PASS":
          serverCommands.PASS(socket, args)
          break;
        case "LIST":
          serverCommands.LIST(socket);
          break;
        case "CWD":
          serverCommands.CWD(socket, args);
          break;
        case 'RETR':
          serverCommands.RETR(socket, args)
          break;
        case 'STOR':
          serverCommands.STOR(socket, args)
          break;
        case "PWD":
          serverCommands.PWD(socket)
          break;
        case "HELP":
          serverCommands.HELP(socket);
          break;
        case "QUIT":
          serverCommands.QUIT(socket)
          break;

        default:
          console.log("command not supported:", command, args);
      }
    });

    socket.write("220 - Hello World \r\n");
  });

  server.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
  });
}

