# HomeAway Prototype
Download the HomeawayReport.docx  uploaded along with the code which contains the screenshots of the application along with the screenshots of backend and kafka console. Each and every functionality  is explained in the report.

You can see screenshots of localhost, when it was uploaded on AWS, jmeter testing, mocha testing as you scroll down the file.


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

• cd Homeaway-Backend
• npm install
• nodemon index.js

Front-end server

• cd homeaway-frontend
• npm install
• npm start

Kafka

• Run zookeeper kafka and create topics 
bin/zookeeper-server-start.sh config/zookeeper.properties

bin/kafka-server-start.sh config/server.properties

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic registerowner

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login.

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic registertravel

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic loginowner

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic homesearch

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic bookproperty

 bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic listproperty

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic booking

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic displaypropery

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic converttravel

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userisplay

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic ownerdashboard

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic dashboard

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userupdate

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic emailupdate

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic updatepassword

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic questionfromtraveller

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic ownerinbox

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic replyfromowner

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic travellerinbox

• cd homeaway-kafka
• npm install
• nodemon server.js
