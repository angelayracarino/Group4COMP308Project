//
// A GraphQL schema that defines types, queries and mutations
//
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var GraphQLBoolean = require('graphql').GraphQLBoolean;

// Models
var User = require('../models/User');
var AlertModel = require('../models/Alert');
var SymptomsModel = require('../models/Symptoms');
var TipsModel = require('../models/Tips');
var UserModel = require('../models/User');
var VitalModel = require('../models/Vitals');

//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // generate this elsewhere
const jwtExpirySeconds = 1000;

//
// Create a GraphQL Object Type for Student model
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type.
const userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
      return {
        _id: {
          type: GraphQLID
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        address: {
          type: GraphQLString
        },
        city: {
          type: GraphQLString
        },
        province: {
          type: GraphQLString
        },
        postalcode: {
            type: GraphQLString
        },
        phone: {
          type: GraphQLString
        },
        role:{
            type: GraphQLString
        }
      }
    }
  });
  //

// Create a GraphQL query type that returns a student by id
// In this case, the queries are defined within the fields object.
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type. 
//
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        users: {
            type: new GraphQLList(userType),
            resolve: function () {
              const users = User.find().exec()
              if (!users) {
                throw new Error('Error')
              }
              return users
            }
          },
          user: {
            type: userType,
            args: {
              id: {
                name: '_id',
                type: GraphQLString
              }
            },
            resolve: function (root, params) {
              const userInfo = User.findById(params.id).exec()
              if (!userInfo) {
                throw new Error('Error')
              }
              return userInfo
            }
          },
          // check if user is logged in
          isLoggedIn: {
            type: GraphQLString,
            args: {
              email: {
                name: 'email',
                type: GraphQLString
              }
    
            },
            resolve: function (root, params, context) {
              //
              console.log(params)
              console.log('in isLoggedIn.....')
              console.log(context.req.cookies['token'])
              console.log('token: ')
              //
              // Obtain the session token from the requests cookies,
              // which come with every request
              const token = context.req.cookies.token
              console.log('token from request: ', token)
              // if the cookie is not set, return 'auth'
              if (!token) {
                console.log('no token, so return auth')
                return 'auth';
              }
              var payload;
              try {
                // Parse the JWT string and store the result in `payload`.
                // Note that we are passing the key in this method as well. 
                // This method will throw an error
                // if the token is invalid (if it has expired according to the expiry time
                //  we set on sign in), or if the signature does not match
                payload = jwt.verify(token, JWT_SECRET)
              } catch (e) {
                if (e instanceof jwt.JsonWebTokenError) {
                  // the JWT is unauthorized, return a 401 error
                  console.log('jwt error')
                  return context.res.status(401).end()
                }
                // otherwise, return a bad request error
                console.log('bad request error')
                return context.res.status(400).end()
              }
              console.log('email from payload: ', payload.email)
              // Finally, token is ok, return the email given in the token
              // res.status(200).send({ screen: payload.email });
              return payload.email;
    
            }
          },
      }
    }
});

// Add a mutation for creating user
// In this case, the createUser mutation is defined within the fields object.