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
var GraphQLFloat = require('graphql').GraphQLFloat;

// You can now use GraphQLFloat as a scalar type in your GraphQL schema or resolver code


// Models
var User = require('../models/User');
var AlertModel = require('../models/Alert');
var SymptomModel = require('../models/Symptom');
var TipModel = require('../models/Tip');
var UserModel = require('../models/User');
var VitalModel = require('../models/Vital');

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
  name: 'users',
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
      role: {
        type: GraphQLString
      }
    }
  }
});
//

const vitalType = new GraphQLObjectType({
  name: 'vital',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      bodyTemperature: {
        type: GraphQLString
      },
      heartRate: {
        type: GraphQLString
      },
      bloodPressure: {
        type: GraphQLString
      },
      respiratoryRate: {
        type: GraphQLString
      },
      pulseRate: {
        type: GraphQLString
      },
      date: {
        type: GraphQLString
      },
      time: {
        type: GraphQLString
      },
      patient: {
        type: GraphQLString
      }
    }
  }
});

const tipType = new GraphQLObjectType({
  name: 'tip',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
  }
});

const alertType = new GraphQLObjectType({
  name: 'alert',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      responderName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      phoneNumber: {
        type: GraphQLString
      },
    }
  }
});

const symptomsType = new GraphQLObjectType({
  name: 'symptoms',
  fields: function () {
    return {
      _id: {
        type: GraphQLNonNull(GraphQLID)
      },
      symptom: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))
      },
      date: {
        type: GraphQLNonNull(GraphQLDate)
      },
    }
  }
});




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
      alerts: {
        type: new GraphQLList(alertType),
        resolve: function () {
          const alerts = AlertModel.find().exec()
          if (!alerts) {
            throw new Error('Error')
          }
          return alerts
        }
      },
      alert: {
        type: alertType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
      },
      tips: {
        type: new GraphQLList(tipType),
        resolve: function () {
          const tips = TipModel.find().exec()
          if (!tips) {
            throw new Error('Error')
          }
          return tips
        }
      },
      tip: {
        type: tipType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const tipInfo = TipModel.findById(params.id).exec()
          if (!tipInfo) {
            throw new Error('Error')
          }
          return tipInfo
        }
      },
      symptoms: {
        type: new GraphQLList(symptomsType),
        resolve: function () {
          const symptoms = SymptomModel.find().exec()
          if (!symptoms) {
            throw new Error('Error')
          }
          return symptoms
        }
      },
      symptom: {
        type: symptomsType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        }
      },
      vitals: {
        type: new GraphQLList(vitalType),
        resolve: function () {
          const vitals = VitalModel.find().exec()
          if (!vitals) {
            throw new Error('Error')
          }
          return vitals
        }
      },
      vital: {
        type: vitalType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const vitalInfo = VitalModel.findById(params.id).exec()
          if (!vitalInfo) {
            throw new Error('Error')
          }
          return vitalInfo
        },
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
          resolve: async function (root, params, context) {
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
              // Parse the JWT string and store the result in payload.
              // Note that we are passing the key in this method as well. 
              // This method will throw an error
              // if the token is invalid (if it has expired according to the expiry time
              //  we set on sign in), or if the signature does not match
              const payload = jwt.verify(token, JWT_SECRET)
              const user = await User.findOne({ email: payload.email });
              return user.role;
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
        checkUserRole: {
          type: GraphQLString,
          resolve: async function (root, params, context) {
            const token = context.req.cookies.token;
            if (!token) {
              return 'auth';
            }
            try {
              const payload = jwt.verify(token, JWT_SECRET);
              const user = await User.findOne({ email: payload.email });
              return user.role;
            } catch (err) {
              console.error(err);
              return 'auth';
            }
          }
        },
        redirectToPage: {
          type: GraphQLString,
          resolve: async function (root, params, context) {
            const token = context.req.cookies.token;
            if (!token) {
              return 'auth';
            }
            try {
              const payload = jwt.verify(token, JWT_SECRET);
              const user = await UserModel.findOne({ email: payload.email });
              if (user.role === 'patient') {
                return '/patient-page';
              } else if (user.role === 'nurse') {
                return '/nurse-page';
              } else {
                return '/login';
              }
            } catch (err) {
              console.error(err);
              return 'auth';
            }
          }
        }
      }
    }
  }
});

// Add a mutation for creating user
// In this case, the createUser mutation is defined within the fields object.
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      createUser: {
        type: userType,
        args: {
          firstName: { type: GraphQLNonNull(GraphQLString) },
          lastName: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
          address: { type: GraphQLNonNull(GraphQLString) },
          city: { type: GraphQLNonNull(GraphQLString) },
          province: { type: GraphQLNonNull(GraphQLString) },
          postalcode: { type: GraphQLNonNull(GraphQLString) },
          phone: { type: GraphQLNonNull(GraphQLString) },
          role: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const userModel = new User(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error('Error');
          }
          return newUser
        }
      },

      // a mutation to log in the student
      loginUser:
      {
        type: GraphQLString,
        args: {
          email: {
            name: 'email',
            type: GraphQLString
          },
          password: {
            name: 'password',
            type: GraphQLString
          }
        },

        resolve: async function (root, params, context) {
          console.log('email:', params.email)
          // find the student with email if exists
          const userInfo = await User.findOne({ email: params.email }).exec()
          console.log(userInfo)
          if (!userInfo) {
            throw new Error('Error - student not found')
          }
          console.log('email:', userInfo.email)
          console.log('entered pass: ', params.password)
          console.log('hash', userInfo.password)
          // check if the password is correct
          const isValidPassword = await bcrypt.compare(params.password, userInfo.password);
          if (!isValidPassword) {
            return 'auth';
            //throw new Error('Invalid login credentials');
          }
          console.log('password is valid')
          console.log('password matches')
          console.log('email:', userInfo.email)
          console.log('Object id of user:', userInfo._id);
          // sign the given payload (arguments of sign method) into a JSON Web Token 
          // and which expires 300 seconds after issue
          const token = jwt.sign({ _id: userInfo._id, email: userInfo.email }, JWT_SECRET,
            { algorithm: 'HS256', expiresIn: jwtExpirySeconds });
          console.log('registered token:', token)

          // set the cookie as the token string, with a similar max age as the token
          // here, the max age is in milliseconds
          context.res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
          console.log('cookie set with:', userInfo.email)
          //context.res.status(200).send({ screen: userInfo.firstname });
          return userInfo.email;

        } //end of resolver function
      },
      // a mutation to log the student out
      logOut: {
        type: GraphQLString,
        resolve: (parent, args, { res }) => {
          res.clearCookie('token');
          return 'Logged out successfully!';
        },
      },
      //
      createVital: {
        type: vitalType,
        args: {
          bodyTemperature: { type: GraphQLNonNull(GraphQLString) },
          heartRate: { type: GraphQLNonNull(GraphQLString) },
          bloodPressure: { type: GraphQLNonNull(GraphQLString) },
          respiratoryRate: { type: GraphQLNonNull(GraphQLString) },
          pulseRate: { type: GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLNonNull(GraphQLString) },
          time: { type: GraphQLNonNull(GraphQLString) },
          patient: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const vitalModel = new VitalModel(params);
          const newVital = vitalModel.save();
          if (!newVital) {
            throw new Error('Error');
          }
          return newVital
        }
      },
      updateVital: {
        type: vitalType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          bodyTemperature: { type: GraphQLNonNull(GraphQLString) },
          heartRate: { type: GraphQLNonNull(GraphQLString) },
          bloodPressure: { type: GraphQLNonNull(GraphQLString) },
          respiratoryRate: { type: GraphQLNonNull(GraphQLString) },
          pulseRate: { type: GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLNonNull(GraphQLString) },
          time: { type: GraphQLNonNull(GraphQLString) },
          patient: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          try {
            const updateVital = VitalModel.findByIdAndUpdate(
              params.id, {
              bodyTemperature: params.bodyTemperature,
              heartRate: params.heartRate,
              bloodPressure: params.bloodPressure,
              respiratoryRate: params.respiratoryRate,
              pulseRate: params.pulseRate,
              date: params.date,
              time: params.time,
              patient: params.patient
            }, { new: true }).exec();
            if (!updateVital) {
              throw new Error('Error')
            }
            return updateVital;
          } catch (err) {
            console.log(err)
          }
        }
      },
      createTips: {
        type: tipsType,
        args: {
          title: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const tipsModel = new TipModel(params);
          const newTips = tipsModel.save();
          if (!newTips) {
            throw new Error('Error');
          }
          return newTips
        }
      },
      updateTips: {
        type: tipsType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          title: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          try {
            const updateTips = TipModel.findByIdAndUpdate(
              params.id, {
              title: params.title,
              description: params.description,
            }, { new: true }).exec();
            if (!updateTips) {
              throw new Error('Error')
            }
            return updateTips;
          } catch (err) {
            console.log(err)
          }
        }
      },
      deleteTips: {
        type: tipsType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const deleteTips = TipModel.findByIdAndRemove(params.id).exec();
          if (!deleteTips) {
            throw new Error('Error')
          }
          return deleteTips;
        }
      },
      createAlert: {
        type: alertType,
        args: {
          responderName: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
          phoneNumber: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const alertModel = new Alert(params);
          const newAlert = alertModel.save();
          if (!newAlert) {
            throw new Error('Error');
          }
          return newAlert
        }
      },
      createSymptoms: {
        type: symptomsType,
        args: {
          symptoms: { type: GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const symptomsModel = new Symptoms(params);
          const newSymptoms = symptomsModel.save();
          if (!newSymptoms) {
            throw new Error('Error');
          }
          return newSymptoms
        }
      },
    }
  }
});
//
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });