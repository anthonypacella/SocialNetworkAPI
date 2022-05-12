const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
  
// Drop existing Users
await Thought.deleteMany({});

// Drop existing Thoughts
await User.deleteMany({});

// Create empty array to hold the Users
const users = [];

// Add users to the collection and await the results
await User.collection.insertMany(userData);

// Add thoughts to the collection and await the results
await Thought.collection.insertMany(thoughtData);

console.table(users);
console.info('Seeding complete! 🌱');
process.exit(0);
});