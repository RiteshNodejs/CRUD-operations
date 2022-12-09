# CRUD operations,
## I am using these tools  
* node v16.17.1 ,
* npm 9.1.2,
* express 4.18.2 ,
* joi 17.7.0,
* dotenv 16.0.3,
* bcryptjs 2.4.3 ,
* esm 3.2.25,
* jsonwebtoken 8.5.1,
* mongoose 6.7.3;

### 1.Create a new directory/folder for project 
### 2.Create a js file named as app.js
### 3.initialize a new npm project
* npm init -y  
* npm i express
### 4.import express in app.js 
### 5.Setting Up the Server
* mongoose 6.7.3
* mongodb v6.0.2
### 6.Created Router folder for Route.js file
* all routes are created in Route.js
### 7.Middleware folder
#### in middleware folder we have 
* 1.authMiddleware , we implement jsonwebtoken (jwt) validation 
* 2.JoiMiddleeare , we implement joi validation with  validation helper that is placed in helper folder.
### 8.helper (folder) ->we place comman messages and validation in it 
* 1.messagehelper.js- for res or error messages
* 2.multervalidation.js- for images storage and validation
* 3.response helper.js - for pre defined structure for response 
* 4.validation helper.js- for joi validation structure for input validation 

### CRUD API links & Working 
* #### Register user  post:(localhost:3000/register)
  * firstName:required,
  * lastName:required,
  * email:required,
  * password:required , convert by  bcrypt
    
* #### Login user  post: (localhost:3000/login)
  * email:required,
  * password:required,
  * then token is generated ( Token Expiry time : 15 minute)
* #### Profile  get :(localhost:3000/profile)
  * add token in  Auth/Bearer 
  * In Response it Shows user  details 
* #### Update user   put:(localhost:3000/updateProfile)
  * there is no required feild now for testing purpose
* #### Delete   Delete:(localhost:3000/deleteUser)
  * token is used for delete user (soft delete )
* #### Add quotes  post:(localhost:3000/addquotes)
  * add token in  Auth/Bearer
  * title feild is required
* #### Get user quotes get:(localhost:3000/userquotes)
  * add token in  Auth/Bearer
* #### Get all users quotes get:(localhost:3000/allQuotes)


