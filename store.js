const storeRouter = require('express').Router();
let Store = require('../models/storeModel');

/** 
 * @swagger
 * /store:
 *   get:
 *     tags:
 *       - Store
 *     summary: List of all stores.
 *     description: Retrieve a list of all stores.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
 storeRouter.get('/', function (req, res, next) {

    Store.find()
    .then(stors => {		
		let returnedStors = [];
		
		for (let i = 0; i < stors.length; i++) {
			returnedStors.push(stors[i].transform());
		}
		
		res.json(returnedStors);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

    
});




storeRouter.get('/store/count',async  (req, res, next)=>{

    let storesCount = await Store.countDocuments();
    console.log(storesCount)
    res.status(200).json({
        sotres : 10,
        success: true
    });
    })
/**
 * @swagger
 * /store/{id}:
 *   get:
 *     tags:
 *       - Store
 *     summary: Get store by id.
 *     description: Retrieve a store by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the store to get
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
storeRouter.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Store.findById(id, function (err, store) {
        res.json(store); 
    });
});

/**
 * @swagger
 * /store/add:
 *   post:
 *     tags:
 *       - Store
 *     summary: Add store.
 *     description: Add store.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      address:
 *                          type: string
 *                      governorate:
 *                          type: string
 *                      phone:
 *                          type: string
 *                      facebook_link:
 *                         type: string
 *                      website:
 *                         type: string
 *     responses:
 *       200:
 *         description: store added successfully.
 *       400:
 *         description: Adding new store failed. 
 * 
 * definitions:
 *   Store:
 *      type: object
 *      required:
 *          - name
 *      properties:
 *          name:
 *              type: string
 *          address: 
 *              type: string
 *          governorate: 
 *              type: string 
 *          phone: 
 *              type: string 
 *          facebook_link: 
 *              type: string 
 *          website :
 *              type: string 
 */
storeRouter.route('/add').post(function (req, res) {
    let store = new Store(req.body);
    store.save()
        .then(store => {
            res.status(200).json({ 'Store': 'Store added successfully' });
        })
        .catch(err => {
            res.status(400).send('Adding new store failed');
        });
});

/**
 * @swagger
 * /store/update/{id}:
 *   post:
 *     tags:
 *       - Store
 *     summary: Update store by id.
 *     description: Update store by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the store to update.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      address: 
 *                          type: string
 *                      governorate: 
 *                          type: string 
 *                      phone: 
 *                          type: string 
 *                      facebook_link: 
 *                          type: string 
 *                      website :
 *                          type: string  
 *     responses:
 *       200:
 *         description: Store updated.
 *       400:
 *         description: Update failed. 
 *       404:
 *         description: Store not found. 
 */
storeRouter.route('/update/:id').post(function (req, res) {
    Store.findById(req.params.id, function (err, store) {
        if (!store)
            res.status(404).send('Store not found');
        else
            store.name = req.body.name;
        store.address = req.body.address;
        store.governorate = req.body.governorate;
        store.phone = req.body.phone;
        store.facebook_link = req.body.facebook_link;
        store.website = req.body.website;
        store.save().then(store => {
            res.json('Store updated');
        })
            .catch(err => {
                res.status(400).send("Update failed");
            });
    });
});

/**
 * @swagger
 * /store/delete/{id}:
 *   delete:
 *     tags:
 *       - Store
 *     summary: Delete store by id.
 *     description: Delete a store by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the store to delete.
 *     responses:
 *       200:
 *         description: Store deleted.
 *       400:
 *         description: Delete failed.
 *       404:
 *         description: Store not found.
 */
storeRouter.route('/delete/:id').delete(function (req, res) {
    Store.findById(req.params.id, function (err, store) {
        if (!store)
            res.status(404).send('Store not found');
        else
            store.delete().then(store => {
                res.json('Store deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete failed");
                });
    });
});

module.exports = storeRouter;