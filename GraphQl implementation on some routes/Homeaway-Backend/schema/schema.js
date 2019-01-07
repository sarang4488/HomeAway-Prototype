const graphql = require("graphql");
const _ = require("lodash");
const graphqlisodate = require("graphql-iso-date");
var config = require("../configDB/settings");

var mongoose = require("../mongoose");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
var res = {};
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
var GraphQLDate = require("graphql-date");
//const { GraphQLDate } = graphqlisodate;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: GraphQLString },
    token: { type: GraphQLString },
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    city: { type: GraphQLString },
    country: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    school: {
      type: GraphQLString
    },
    hometown: {
      type: GraphQLString
    },
    languages: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
    },
    about: {
      type: GraphQLString
    }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    ownername: { type: GraphQLString },
    name: { type: GraphQLString },
    propertydescription: { type: GraphQLString },
    location: { type: GraphQLString },
    checkin: { type: GraphQLDate },
    checkout: { type: GraphQLDate },
    type: { type: GraphQLString },
    guests: { type: GraphQLInt },
    price: { type: GraphQLInt },
    bedrooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    description: { type: GraphQLString },
    amenities: { type: GraphQLString }
  })
});

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    customername: { type: GraphQLString },
    propertyname: { type: GraphQLString },
    description: { type: GraphQLString },
    checkin: { type: GraphQLDate },
    checkout: { type: GraphQLDate },
    guests: { type: GraphQLString },
    price: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    property: {
      type: PropertyType,
      args: { name: { type: GraphQLString } },

      async resolve(parent, args) {
        console.log("inside book property display");
        let property = await mongoose.Properties.findOne({
          name: args.name
        });
        if (property) {
          console.log("Property to be displayed for booking");
          console.log(property);

          return property;
        }
      }
    },

    userdetails: {
      type: UserType,
      args: { name: { type: GraphQLString } },

      async resolve(parent, args) {
        console.log("inside user display");
        let property = await mongoose.Users.findOne({
          name: args.name
        });
        if (property) {
          console.log(property);

          return property;
        }
      }
    },

    ologin: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let user = await mongoose.Users.findOne({
          email: args.email,
          type: "owner"
        });
        if (user) {
          let res1 = await bcrypt.compare(args.password, user.password);
          if (res1 == true) {
            const payload = { email: user.email, name: user.name };
            let token = jwt.sign(payload, config.secret, { expiresIn: 10080 });

            let final_token = "JWT " + token;
            let new_token = { token: final_token };
            let status = { status: "200" };
            Object.assign(user, new_token, status);
            console.log("Owner login successful");
            console.log(user);
            return user;
          } else {
            console.log("Incorrect username or password");
            let status = { status: "201" };
            let message = { message: "Incorrect username or password" };
            Object.assign(user, status, message);
            return user;
          }
        } else {
          console.log("User does not exist");
          return { status: "401", message: "User does not exist" };
        }
      }
    },

    tlogin: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let user = await mongoose.Users.findOne({
          email: args.email,
          type: "traveller"
        });
        if (user) {
          let res1 = await bcrypt.compare(args.password, user.password);
          if (res1 == true) {
            const payload = { email: user.email, name: user.name };
            let token = jwt.sign(payload, config.secret, { expiresIn: 10080 });

            let final_token = "JWT " + token;

            let new_token = { token: final_token };
            let status = { status: "200" };
            Object.assign(user, new_token, status);
            console.log("Login successful");
            console.log(user);
            return user;
          } else {
            console.log("Incoorect username or password");
            let status = { status: "201" };
            let message = { message: "Incorrect username or password" };
            Object.assign(user, status, message);
            return user;
          }
        } else {
          console.log("User does not exist");
          return { status: "401", message: "User does not exist" };
        }
      }
    },

    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          mongoose.Properties.find().then(properties => {
            console.log(properties);
            resolve(properties);
          });
        });
        // return properties;
      }
    },

    myproperties: {
      type: new GraphQLList(BookingType),
      args: {
        customername: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.log("Inside Travler Dashboard");
        let bookings = await mongoose.Booking.find({
          customername: args.customername
        });
        if (bookings) {
          let status = { status: "200" };
          Object.assign(bookings, status);
          console.log("Recent bookings are ", bookings);
          return bookings;
        } else {
          console.log("\n---NO BOOKINGS FOUND---\n");
          let status = { status: "404" };
          let message = { message: "BOOKINGS NOT FOUND!" };
          Object.assign(bookings, status, message);
          return bookings;
        }
      }
    },

    ownerproperties: {
      type: new GraphQLList(PropertyType),
      args: {
        ownername: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let bookings = await mongoose.Properties.find({
          ownername: args.ownername
        });
        console.log("inside owner dashboard");
        if (bookings) {
          let status = { status: "200" };
          Object.assign(bookings, status);
          console.log("Properties found:");
          console.log(bookings);
          return bookings;
        } else {
          console.log("\n---NO BOOKINGS FOUND---\n");
          let status = { status: "404" };
          let message = { message: "BOOKINGS NOT FOUND!" };
          Object.assign(bookings, status, message);
          return bookings;
        }
      }
    }
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     return users;
    //   }
    // }
  }
});

var count = 10;
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTraveller: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      resolve(parent, args) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(args.password, salt);
        var password = hash;
        // const selectQueryString = “select * from user_signup where email = ?“;
        var traveller = new mongoose.Users({
          name: args.name,
          email: args.email,
          password: password,
          type: args.type
        });
        console.log("Traveller already exists");
        console.log(traveller);
        traveller.save();

        return traveller;
      }
    },

    userUpdate: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },

        city: { type: GraphQLString },
        country: {
          type: GraphQLString
        },
        company: {
          type: GraphQLString
        },
        school: {
          type: GraphQLString
        },
        hometown: {
          type: GraphQLString
        },
        languages: {
          type: GraphQLString
        },
        gender: {
          type: GraphQLString
        },
        about: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        var traveller = mongoose.Users.findOneAndUpdate(
          { email: args.email },
          {
            $set: {
              name: args.name,

              about: args.about,
              city: args.city,
              country: args.country,
              company: args.company,
              school: args.school,
              hometown: args.hometown,
              languages: args.languages,
              gender: args.gender
            }
          }
        );
        console.log("Traveller", traveller);
        return traveller;
      }
    },
    addOwner: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      resolve(parent, args) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(args.password, salt);
        var password = hash;
        // const selectQueryString = “select * from user_signup where email = ?“;
        var owner = new mongoose.Users({
          name: args.name,
          email: args.email,
          password: password,
          type: args.type
        });
        console.log("Owner successfully created");
        console.log(owner);

        owner.save();

        return owner;

        // if (user) {
        //   console.log("if string", user);
        //   let status = { status: "200" };
        //   Object.assign(owner, status);
        //   console.log("User created");
        //   return owner;
        // } else {
        //   console.log("else string", user);
        //   let status = { status: "400" };
        //   console.log("Error creating user");
        //   Object.assign(owner, status);
        //   return owner;
        // }
        //   owner => {
        //     console.log("User created :", owner);
        //     status = "200";
        //     Object.assign(owner, status);
        //   },
        //   err => {
        //     console.log("Error creating user");
        //     status = "400";
        //     Object.assign(owner, status);
        //   }
        // );
      }
    },

    bookProperty: {
      type: BookingType,
      args: {
        customername: { type: GraphQLString },
        propertyname: { type: GraphQLString },
        description: { type: GraphQLString },
        checkin: { type: GraphQLDate },
        checkout: { type: GraphQLDate },
        guests: { type: GraphQLString },
        price: { type: GraphQLInt }
      },
      resolve(parent, args) {
        var booking = new mongoose.Booking({
          customername: args.customername,
          propertyname: args.propertyname,
          description: args.description,
          checkin: args.checkin,
          checkout: args.checkout,
          guests: args.guests,
          price: args.price
        });
        booking.save();
        console.log("Booking done successfully");
        console.log("Booking Details", booking);
        return booking;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
