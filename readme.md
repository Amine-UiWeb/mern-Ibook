# about

* creating a simple books plateform to lookup books details and authors informations, using commun mern-stack technologies and tools

## contribution

* Feel free to send pull requests regarding possible changes or improvements to the project

## gitignore file

* Security key files and API keys should be added to the gitignore.
* If some System-specific or IDE-related files need to get ignored, make sure to add them to a global ignore file instead of the repo’s ignore file.

## requirements

-Be sure to have at least Node v14.6+, otherwise add the "--experimental-modules" flag, to be able to use ES6 Modules in the backend in this project

-When importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

## installation

* Clone the ripo to your computer:

```cmd
git clone https://github.com/Amine-UiWeb/mern-IBook.git
cd <project directory>
```

* Setup Env Variables:

Create a .env file in the root of server directory and add the following:

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123...'

* cd to 'server' directory, install dependencies, and run the server:

```cmd
cd server
npm install 
npm run serve
```

* cd back, then to 'client' directory, install dependencies, and run the frontend development server:

```cmd
cd ..
cd client 
npm install
npm run dev
```
