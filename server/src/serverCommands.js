const fs = require('fs-extra')
const path = require('path');
import { dataUsers, dataHelpInformations } from './data' 

function verifUserExist(username){
    let result = false;
    for (const user of dataUsers) {
        if(user.username == username){
            result = true;
        }
    }
    return result
};
function verifPassExist(socket, pass){
    let result = false;
    for (const user of dataUsers) {
        if(user.password == pass && user.username == socket.user){
            result = true;
        }
    }
    return result
};
function transferFile(srcDir, destDir){
    try {
        fs.copySync(srcDir, destDir);
        return true;
    } catch(e){
        return false;
    }
}

// Functions server
export function USER(socket, args){
    let result = ''
    if(verifUserExist(args)){
        socket.write('331 - User name okay, need password. --- \r\n');
        socket.user = args
    }
    else
        socket.write('530 - User does not exist. --- \r\n');
};

export function PASS(socket, args){
    let result = ''
    if(verifPassExist(socket, args))
        socket.write('230 - Password, sucess. User logged in, proceed. ---\r\n');
    else
        socket.write('331 - Password Incorrect. --- \r\n');
};

export function HELP(socket){
    let result = ' 214 - HELP COMMANDS \r\n'
    for (const dataHelp of dataHelpInformations) {
        result += dataHelp.command + ' : ' + dataHelp.text + '\r\n'
    }

    socket.write(result)
};

export function CWD(socket, args){
    try {
        process.chdir(args.toString())
    } catch(e){
        socket.write('--- Directory no found ---')
    }
    socket.write(`250 - New directory: ${process.cwd()} \r\n -------------------- \r\n`)
}

export function LIST(socket){    
    fs.readdir(process.cwd(), (err,files) => {
        files.forEach(file => {
            socket.write(file + " \n");
        })
    })
};

export function QUIT(socket){
    socket.write("221 - closing connection. \r\n")
    // process.exit()
};

export function PWD(socket){
    socket.write(`\r\n 257 - Directory: ${process.cwd()} --- \r\n`);
}

export function RETR(socket, args){
    let directoryCurrent = process.cwd().slice(-6);
    let dirFilesServer, dirFilesClient;
    //console.log(directoryCurrent);
    let file = args.toString()
    // directoryCurrent = 'server' or 'client'

    if(directoryCurrent == 'server'){
        dirFilesServer = path.join(process.cwd(),'files', file)
        dirFilesClient = path.join(process.cwd(), '..', 'client', 'files', file)

        if(transferFile(dirFilesServer, dirFilesClient))
            socket.write('150 - File has been transferred successfully to the client')
        else
            socket.write('--- Directory no found ---')

    } else{
        dirFilesServer = path.join(process.cwd(), '..', 'server', 'files', file)
        dirFilesClient = path.join(process.cwd(), 'files', file)

        if(transferFile(dirFilesServer, dirFilesClient))
            socket.write('150 - File has been transferred successfully to the client')
        else
            socket.write('--- Directory no found ---')
    }
}

export function STOR(socket, args){
    let directoryCurrent = process.cwd().slice(-6);
    let dirFilesServer, dirFilesClient;
    //console.log(directoryCurrent);
    let file = args.toString()
    // directoryCurrent = 'server' or 'client'

    if(directoryCurrent == 'server'){
        dirFilesServer = path.join(process.cwd(),'..', 'client', 'files', file)
        dirFilesClient = path.join(process.cwd(), 'files', file)

        if(transferFile(dirFilesServer, dirFilesClient))
            socket.write('150 - File has been transferred successfully to the server')
        else
            socket.write('--- Directory no found ---')

    } else {
        dirFilesServer = path.join(process.cwd(), 'files', file)
        dirFilesClient = path.join(process.cwd(), '..', 'server', 'files', file)

        if(transferFile(dirFilesServer, dirFilesClient))
            socket.write('150 - File has been transferred successfully to the server')
        else
            socket.write('--- Directory no found ---')
    }
}

