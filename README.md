# MyFTP

## Summary

* [Features](#features)
* [Installation](#installation)
* [Overview](#overview)
* [Credits](#credits)

## Features

I create a git repository named `myftp-live-main` with GITHub Desktop and I create a file called `.author` with my name:

```sh
{
    "firstname": "Alpha",
    "lastname": "KEITA"
}
```
I create a FTP server and a client. The client must manage several commands.

## Technologies
Node JS

## Installation

Install the dependencies and start the server then client

Dependencies :

```sh
npm install
npm run build
```

To start the server :
```sh
npm run dev <port>
```

To start the client :
```sh
npm run dev <port>
```
## Overview

The purpose of this project is to create an FTP client and server.
I use the file RFC959 https://datatracker.ietf.org/doc/html/rfc959

The client must handle the following commands:

* `USER <username>`: check if the user exist
* `PASS <password>`: authenticate the user with a password
* `LIST`: list the current directory of the server
* `CWD <directory>`: change the current directory of the server
* `RETR <filename>`: transfer a copy of the file _FILE_ from the server to the client
* `STOR <filename>`: transfer a copy of the file _FILE_ from the client to the server
* `PWD`: display the name of the current directory of the server
* `HELP`: send helpful information to the client
* `QUIT`: close the connection and stop the program

## Credits

* Alpha KEITA 
