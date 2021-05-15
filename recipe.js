const recipeRouter = require('express').Router();
let Recipe = require('../models/recipeModel');

/** 
 * @swagger
 * /recipe:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: List of all recipes.
 *     description: Retrieve a list of all recipes.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
recipeRouter.get('/', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });
});

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Get recipe by id.
 *     description: Retrieve a recipe by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the recipe to get
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
recipeRouter.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Recipe.findById(id, function (err, recipe) {
        res.json(recipe);
    });
});

/**
 * @swagger
 * /recipe/add:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Add recipe.
 *     description: Add recipe.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      recipeType:
 *                          type: string
 *                      ingredients:
 *                          type: string
 *                      method:
 *                          type: string
 *                      pictures:
 *                          type: string
 *     responses:
 *       200:
 *         description: Recipe added successfully.
 *       400:
 *         description: Adding new recipe failed. 
 * 
 * definitions:
 *   Recipe:
 *      type: object
 *      required:
 *          - name
 *      properties:
 *          name:
 *              type: string
 *          type:
 *              recipeType: string
 *          ingredients:
 *              type: string
 *          method:
 *              type: string
 *          pictures:
 *              type: string
 */
recipeRouter.route('/add').post(function (req, res) {
    let recipe = new Recipe(req.body);
    recipe.save()
        .then(recipe => {
            res.status(200).json({ 'Recipe': 'Recipe added successfully' });
        })
        .catch(err => {
            res.status(400).send('Adding new recipe failed');
        });
});

/**
 * @swagger
 * /recipe/update/{id}:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Update recipe by id.
 *     description: Update recipe by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the recipe to update.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      recipeType:
 *                          type: string
 *                      ingredients:
 *                          type: string
 *                      method:
 *                          type: string
 *                      pictures:
 *                          type: string
 *     responses:
 *       200:
 *         description: Recipe updated.
 *       400:
 *         description: Update failed.
 *       404:
 *         description: Recipe not found. 
 */
recipeRouter.route('/update/:id').post(function (req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
        if (!recipe)
            res.status(404).send('Recipe not found');
        else
            recipe.name = req.body.name;
        recipe.recipeType = req.body.recipeType;
        recipe.ingredients = req.body.ingredients;
        recipe.method = req.body.method;
        recipe.pictures = req.body.pictures;

        recipe.save().then(recipe => {
            res.json('Recipe updated');
        })
            .catch(err => {
                res.status(400).send("Update failed");
            });
    });
});

/**
 * @swagger
 * /recipe/delete/{id}:
 *   delete:
 *     tags:
 *       - Recipe
 *     summary: Delete recipe by id.
 *     description: Delete a recipe by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the recipe to delete
 *     responses:
 *       200:
 *         description: Recipe deleted.
 *       400:
 *         description: Delete failed.
 *       404:
 *         description: Recipe not found.
 */
recipeRouter.route('/delete/:id').delete(function (req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
        if (!recipe)
            res.status(404).send('Recipe not found');
        else
            recipe.delete().then(recipe => {
                res.json('Recipe deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete failed");
                });
    });
});

module.exports = recipeRouter;