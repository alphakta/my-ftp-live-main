import { createConnection } from "net";
import { createInterface } from "readline";

let currentCommand = '';

const client = createConnection({ port: process.argv[2], host: 'localhost' }, () => {
  console.log("Client connected.");
});

const rl = createInterface({
  input: process.stdin,
});

client.on("data", (data) => {

  const message = data.toString();
  console.log("Message received:", message);

  const [status, ...args] = message.trim().split(" ");
  
  if (status == 331 || status == 530 && currentCommand == "USER") {

    rl.on("line", (input) => {
      let string = input.split(' ')
      if (string[0] == 'PASS') {
        client.write(input);
        currentCommand = 'PASS'
      }
      else
        console.log('--- Please enter a password ---')
    });
  }

  if (status == 220) {
    currentCommand = "USER";

    rl.on("line", (input) => {
      let string = input.split(' ')

      if (string[0] == 'USER') 
        client.write(input);
      else if (string[0] == 'HELP' || string[0] == 'QUIT')
        client.write(input)
      else
        console.log('Please log in')
    });
  }

  if (status == 221) {
    currentCommand = "QUIT"
    process.exit()
  }

  if (status == 230 || status == 257) {
    rl.on("line", (input) => {
      client.write(input);
    });}
});


