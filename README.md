# Online Banking Website
This online banking website uses RESTful API design and is built with React.js as frontend, Node.js and Express.js as backend, and MongoDB as database.  
The website has both chequing and saving accounts and includes the following functionalities:
* View saving and chequing transactions in reverse chronological order
* Add and delete transactions
* Make internal transfers (transfers made between accounts), external transfers (transfers made to other people), and auto transfers (transfers that are pre-scheduled). Note that the system uses Eastern Daylight Time


## Website Screenshots
Front Page   
<img src="https://user-images.githubusercontent.com/53383156/92292120-6e569e00-eed0-11ea-8b77-130063fc2aa4.png" width="700" />  
Chequing Transaction Page   
<img src="https://user-images.githubusercontent.com/53383156/92292252-094f7800-eed1-11ea-9b62-fb04db01efc4.png" width="700" />    
Add Transaction Page   
<img src="https://user-images.githubusercontent.com/53383156/92292203-d311f880-eed0-11ea-961a-8c2884d882b8.png" width="700" />     
Transfer Page   
<img src="https://user-images.githubusercontent.com/53383156/92292273-1ff5cf00-eed1-11ea-997c-488f8d51234d.png" width="700" />  


## Installation
1. Enter MongoDB connection url into the config/config.env file ```MONGO_URL = ```
2. Run ```npm install``` to install all dependencies on the backend
3. Run ``` cd client``` ```npm install``` to install all dependencies on the frontend
4. Run ```npm run build``` to build the client folder
5. Run ```cd ..``` and ```npm start``` to start the server and connect to the database
6. Go to http://localhost:5000 to use the website


## Deployed Website
This website has been deployed on Heroku: https://bank-account-manager-app.herokuapp.com
