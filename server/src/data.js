 export const dataUsers = [
    { username: 'test1', password: 'test1' },
    { username: 'test2', password: 'test2' },
    { username: 'test3', password: 'test4' }
  ];

export const dataHelpInformations = [
    { command: 'USER <username>', text: 'check if the user exist'},
    { command: 'PASS <password>', text: 'authenticate the user with a password'},
    { command: 'LIST', text: 'list the current directory of the server'},
    { command: 'CWD <directory>', text: 'change the current directory of the server'},
    { command: 'RETR <filename>', text: 'transfer a copy of the file FILE from the server to the client'},
    { command: 'STOR <filename>', text: 'transfer a copy of the file FILE from the client to the server'},
    { command: 'PWD', text: 'display the name of the current directory of the server'},
    { command: 'HELP', text: 'send helpful information to the client'},
    { command: 'QUIT', text: 'close the connection and stop the program'},
];
