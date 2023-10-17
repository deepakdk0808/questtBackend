# Questt-Backend
Link = https://questt.onrender.com/

Prerequisites

Node.js
npm (Node Package Manager)
Express.js (if applicable)

Extras
"axios", "cors", "crypto-js", "dotenv", "jsonwebtoken", "mongoose"

Endpoints
1.Auth-"/api/auth"
1.1 "/register" =to register the user.
1.2 "/login" =to login the user.

e.g for ADMIN (email =  a@admin.com,password=1234)
e.g for USER (email=d@gmail.com.password=1234)

2.User-"/api/users"
2.1 '/:id' =to update and to delete
2.2  '/'  = to get and to post
2.3 '/find/:id' =to get single user

3.Books="/api/books"
3.1 '/' =to post and to get books on App
3.2 '/allBooks' =to get all books for admin
3.3 '/find/:id' =to get single book
3.4 '/:id' = to delete and to update

4.Cart-"/api/carts"
4.1 '/'=to create cart and to get cart
4.2 '/find/:userId' =to get user cart
4.3 '/:id' to delete and to update

User have to register and then Login(using token for that by saving the token in Local Storage(JWT,Crypto(for Encryption)).After that can see,add and checkout.
if user is not logged in he can see the book but can't use cart for that he have to login.

If the logged in user is Admin he'll be send directly to Admin page where he can add,update,delete books.
On logging out the token is reomved from LocalStorage.

Made .ENV file for storing credentials
