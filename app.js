const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Recipe = require('./models/recipe');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/test');

let recipe1 = new Recipe({name: "Pancakes"});
recipe1.ingredients.push({ingredient: 'sugar', measure: " Tbsp"});
console.log(recipe1.toObject());
// { name: 'Pancakes',
//   _id: 59553335625ccdda459e09b4,
//   steps: [],
//   ingredients:
//    [ { ingredient: 'sugar',
//        measure: 'tbsp',
//        _id: 59553335625ccdda459e09b5,
//        amount: 1 } ] }

const recipe2 = new Recipe({name: "Pancakes2", source: "Grandma"});
recipe2.save()
  .then(function (doc) {
    // actions to take on success
    console.log('save recipe: ' + doc);
  })
  .catch(function (err) {
    // handle error
    console.log('error saving recipe' + err);
  });

// create a model and save in one command
Recipe.create({name: "Pancakes3"})
  .then( (doc) => {
    // actions to take on successful save
    console.log('saved recipe: ' + doc);
  })
  .catch( (err) => {
    // handle error
    console.log('error saving recipe' + err);
  });

// FINDING ONE RECORD
Recipe.findOne({name: "Pancakes2"})
  .then((doc) => {
    console.log('Found: ' + doc);
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

let handleSuccess = function(docs) {
  console.log('handling success');
  console.log(docs);
}

let handleError = function(err) {
  console.log('handling error');
  console.log(err);
}

// FINDING MULTIPLE RECORDS
Recipe.find({cookTime: {$gt: 15, $lt: 60}})
  .then(handleSuccess)
  .catch(handleError);
