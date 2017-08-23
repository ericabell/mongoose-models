const Recipe = require('./models/recipe');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


let url = 'mongodb://localhost:27017/test'


describe("Recipe", function () {
    // connect to Mongo
    beforeAll( (done) => {
      mongoose.connect(url).then(done);
    });

    // delete all recipes
    beforeEach(function () {
        return Recipe.deleteMany({});
    });

    test("can be created", function () {
        return Recipe.create({name: "Pancakes"})
          .then(function (recipe) {
            expect(recipe.id).toBeTruthy();
            expect(recipe.name).toBe("Pancakes");
        });
    });

    test("can create unsaved model", function () {
        let recipe = new Recipe({name: "Pancakes", source: "Grandma"});
        return recipe.save()
          .then( (doc) => {
            expect(doc.name).toBe("Pancakes");
            expect(doc.source).toBe("Grandma");
        });
    });

    test("can create and save in one command", function () {
      return Recipe.create({name: "Pancakes"})
        .then(function (recipe) {
          expect(recipe.id).toBeTruthy();
          expect(recipe.name).toBe("Pancakes");
      });
    });

    test("can find one record", function() {
      Recipe.create({name: "Pancakes"})
        .then( (doc) => {
          return Recipe.findOne({name: doc.name})
            .then( (foundRecipe) => {
              expect(foundRecipe.name).toBe("Pancakes");
            })
        })
    })

    // disconnect from Mongo after all tests have been run
    afterAll( (done) => {
      mongoose.disconnect().then(done);
    });
});
