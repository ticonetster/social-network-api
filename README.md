# social-network-api
## Description
API for a social network web app.  
Users and friends of users can be added, as well as thoughts and reactions to those thoughts.  
This app uses express, mongoose, moment and mongoDB.  
I use Insomnia to demostrate its use.  

## Installation
To get started type npm i, then npm start.

## Users examples

GET ALL USERS  
```
http://localhost:3001/api/users/
```
  
GET USER  
```
http://localhost:3001/api/users/[user ID]
```
  
CREATE USER  
```
http://localhost:3001/api/users/
```
```json
{
	"username": "lucifer",
  "email": "morningstar@gmail.com"
}
```

ADD FRIEND  
```
http://localhost:3001/api/users/[user ID]/friends/[friend ID]
```

UPDATE USER  
```
http://localhost:3001/api/users/[user ID]
```
```json
{
	"username": "kurtonio",
	"email": "kurtonio@gmail.com"
	
}
```

DELETE FRIEND  
```
http://localhost:3001/api/users/[userID]/friends/[friend ID]
```
DELETE USER  
```
http://localhost:3001/api/users/[userID]
```

## Thoughts examples

GET ALL THOUGHTS
```
http://localhost:3001/api/thoughts/
```

GET THOUGHTS BY ID
```
http://localhost:3001/api/thoughts/[thought ID]
```

CREATE THOUGHT
```
http://localhost:3001/api/thoughts/
```
```json
{
	"thoughtText": "a thought",
	"username": "kurtonio",
	"userId": "[user ID]"
}
```

UPDATE THOUGHT
```
http://localhost:3001/api/thoughts/[thought ID]
```
```json
{
	"thoughtText": "another one of my thoughts"
}
```

DELETE THOUGHT
```
http://localhost:3001/api/thoughts/[thought ID]
```

ADD REACTION
```
http://localhost:3001/api/thoughts/[thought ID]/reactions
```
```json
	{
	  "reactionBody": "a reaction",
	  "username": "javier"
	}
  ```
DELETE REACTION
```
http://localhost:3001/api/thoughts/[thought ID]/reactions/[reaction ID]
```

## Users Walkthrough
https://user-images.githubusercontent.com/19826920/184559617-f10f7c3d-ba04-44fd-8a0a-fd8cc266e700.mp4

## Thoughts Walkthrough
https://user-images.githubusercontent.com/19826920/184559626-7589fe1f-3ddd-4ca4-af59-30bfbaedbf48.mp4
