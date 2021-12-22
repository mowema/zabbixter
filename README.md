## Challenge started: Tue 21 Dec 2021

This challenge was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) on the web side, and a [Prisma Example](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth) using graphql on the server side.

## -> steps for the deploy
install postgres  
'yarn install' in web & server  
create database  
modify .env file to match the database url  

inside server run:  
yarn generate  
yarn prisma db seed 

in server run 'yarn dev' to get the prisma server ready at port 4000  
in web run 'yarn start' to browse the react application


http://zabbix.demonubiral.com/api_jsonrpc.php

https://www.zabbix.com/documentation/current/en/manual/api/reference


### authenticate

    {
        "jsonrpc": "2.0",
        "method": "user.login",
        "params": {
            "username": "interview_test",
            "password": "1nt3rv13w"
        },
        "id": 1
    }

### request  

    {
        "jsonrpc": "2.0",
        "method": "host.get",
        "params": {
            "output": ["name","host"],"selectItems": ["name","description","status"],
            "selectGroups": "extend"
            
        },
        "auth": "e41659f4e481c650108733afb47dfcef",
        "id": 1
    }

