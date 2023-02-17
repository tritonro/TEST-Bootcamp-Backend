# TEST Bootcamp Backend Activity

## Introduction
In this activity, you will be making the backend for a forum website. This website will consist of a login page, a home page, and a new post page. All of these pages will be given to you. In order for the website to work however, you will need to create the login workflow, render the feed, and allow users to create new posts.

This will involve 
1. Creating a database in MongoDB to store user account info and all of the posts
2. Creating and connecting an Express.js server to the database through a MongoDB driver
3. Writing the backend logic for the Express.js server to route web pages and retrieve and post data to the database

## 1. MongoDB
### Installation
First, lets make sure you have MongoDB installed. In order to install MongoDB, you will need XCode developer tools and Homebrew. You can install the XCode developer tools by running `xcode-select --install`. If you already have them installed, this command will also let you know. 

Next, check that you have Homebrew installed by running `brew -v`. If this fails, then install [Homebrew](https://brew.sh/).

Now we can install MongoDB as outlined on [their website](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/). We will also outline the steps here in case you are too lazy to click that link.
1. Tell brew where to install MongoDB: `brew tap mongodb/brew`
2. Update brew and its packages: `brew update`
3. Install MongoDB: `brew install mongodb-community@6.0`

### Running the MongoDB Server
In order to eventually connect our Node server to our MongoDB database, we will need a server that hosts the database. This is a little annoying, but luckily MongoDB (and pretty much all database softwares) comes with this server! So now we just need to run it. This can be done through Homebrew, via the following: `brew services start mongodb-community@6.0`. You can check that this server is indeed running as a background process with `brew services list` and you can stop the server with `brew services stop mongodb-community@6.0`.

Once the server is up and running, we can access it through the commandline using the `mongosh` command. This will open an interactive shell that lets you enter in commands to interact with the MongoDB server. It should look something like this: 
<p align="center">
<img width="711" alt="Screen Shot 2023-02-16 at 12 29 02 PM" src="https://user-images.githubusercontent.com/28614382/219479733-eeea0462-2f1f-4260-8995-4e858e5c25ae.png">
</p>

Take note of the [URI](https://danielmiessler.com/study/difference-between-uri-url/) that's in green. This specifies where to find our server (`127.0.0.1` is the local address of your computer and can also be referenced by the name `localhost`). We won't need this URI right now, but we will need it in Step 2 when we connect the Express.js server to this MongoDB server as this URI describes where to connect to.

Before we move on to the Express.js server, we will mess around with `mongosh` a bit (You can find info on the different commands and stuff available in `mongosh` on [the MongoDB website](https://www.mongodb.com/docs/mongodb-shell/crud/)). 

Type `show dbs` to see a list of all the databases on the server. Although we haven't made one yet, there should be a few default databases. We can switch to any of these databases with the `use` command (i.e. `use admin`). Note: you can also switch to a database that you haven't created yet as MongoDB will just create it for you automatically! This is how we will create the database for our website :). Type `use testDevs` to switch to your new database (you can substitute `testDevs` with any name you want, just make sure you use your name whenever I use `testDevs` in the rest of this guide).

Now we want to make 2 collections/tables, one for our users and one for our posts. Much like with databases, you don't have to explicitly create the collections. Instead, you can just pretend they already exist and try to insert data into them. Once you've inserted a document, MongoDB will automatically create a collection for you. The syntax for inserting a single document is `db.collectionName.insertOne(document)` where `collectionName` is replaced with whatever you want to name your collection (i.e. `users`) and `document` is a JavaScript object containing your desired data (i.e `{username: 'rohan', password: '123abc'}`).

Once you are done playing around with `mongosh`, you can exit the program by either typing `quit` or by pressing ctrl + d.
### Exercise 1.1
1. Create a `users` collection by inserting in a document correspsonding to a user. Carefully consider what information a user account will need in order for our website to work properly.
2. Create a `posts` collection by inserting in a document corresponding to a sample post. Carefully consider what information we need to store for every post.

*Hint:* Looking at the different `.html` files may give some information about what attributes the website is expecting, but you are also more than welcome to change the HTML/CSS to accomodate your idea of what users/posts should look like!

Note: MongoDB will automatically generate a unique id for each document (denoted by the `_id` key) so you don't need to worry about user or post ids.

## 2. Express.js Server
Node.js is a JavaScript runtime environment. This means that it is software that lets you run JavaScript code on your computer. This is useful because it allows us to write a server in JavaScript and run it on our computer. Express.js is a server framework that sits on top of Node.js and makes it easier to write a server. As a result, we will use it when writing our server :)
### Installation
First we need to check if you have Node.js installed. Type `node -v`. If this gives you an error, then install Node.js from [their website](https://nodejs.org/en/download/).

Note that our folder already contains some files. This is because when I first created the project, I ran `npm init`. This created a `package.json` file that records basic project info as well as a list of the packages used and `package-lock.json` which records more specific information about the packages like what dependencies their installed version requires. 

I also installed the necesssary packages for you through `npm install package-name` where `package-name` was replaced with the names of the necessary packages (i.e. express). This command adds the package meta-data in `package.json` and `package-lock.json`, but also installs the packages into a folder called `node-modules/`. Note that you do not have this folder! Don't worry though, just type `npm install`. This will create the folder and install all packages in `package-lock.json` into it.

Note: If you are curious, you can open `package.json` to see which packages I installed. They also show up in `index.js` as they are imported through the `require(...)` syntax.

### Running the server
We now have almost everything we need for the server to run! The only thing we're missing is the URI from Part 1. Copy the URI that showed up when you ran `mongosh` and set the `uri` variable in `index.js` equal to it. Now we can finally run our server!! Type `node index.js` to start our server. You should see the following
```
$ node index.js
Server listening on port 3000
Connected successfully to MongoDB server
```
Now open your browser and go to `http://localhost:3000/`. You should see the login page rendered! However, if you try to login, nothing happens :(

To fix this, we will have to start writing our backend :0 You can stop the server by entering ctrl + c or ctrl + d.

## 3. Writing the Backend
### Exercise 3.1
The first step is to write handle the login requests. Note that in `login.html`, pressing the login button sends a GET request to `localhost:3000/login`. The POST requests at this URL are handled by our server through the function in `app.post('/login', func);`. Open `index.js` and fill in this function's body, to make it do roughly the following.
1. Get the POST request's information
2. Check if this matches with a user in the users collection of our database
3. If it does, then route the client to `home.html`
4. Otherwise, send a 404 status

To test this, run the server using `node index.js` and go to `http://localhost:3000/` in your browser. This will open the login page. Enter in user information that exists in your database (i.e. the data you entered with `mongosh` in Step 1). Then it should render the home page.

### Exercise 3.2
