# HomeAway Prototype
Homeaway Prototype using technologies:

• Frontend: ReactJs ,Redux, CSS,Bootsrap
• Backend:  Node.js
• Database: MySQL, MongoDB
• Messaging Queue: Kafka

Features:

• Login Traveller and Owner
• Register Traveller and Owner
• Traveller can Search for Properties
• Traveller can Book properties
• Owner Can Post property for booking
• Owner and Traveller dashboard
• Traveller can message to owner and owner can respond to the query
• Update personal profile page


Steps to run the application:

Back-end server

cd Homeaway-Backend
npm install
nodemon index.js

Front-end server

cd homeaway-frontend
npm install
npm start

Kafka

Run zookeeper kafka and create topics 
cd homeaway-kafka
npm install
nodemon server.js
