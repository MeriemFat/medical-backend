const userRouter = require('express').Router();
let User = require('../models/userModel');

/** 
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: List of all users.
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
userRouter.get('/', function (req, res, next) {

    User.find()
    .then(users => {		
		let returnedUsers = [];
		
		for (let i = 0; i < users.length; i++) {
			returnedUsers.push(users[i].transform());
		}
		
		res.json(returnedUsers);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

    
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by id.
 *     description: Retrieve a user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the user to get
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
userRouter.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

/**
 * @swagger
 * /user/add:
 *   post:
 *     tags:
 *       - User
 *     summary: Add user.
 *     description: Add user.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *                      email:
 *                          type: string
 *     responses:
 *       200:
 *         description: User added successfully.
 *       400:
 *         description: Adding new user failed. 
 * 
 * definitions:
 *   User:
 *      type: object
 *      required:
 *          - username
 *      properties:
 *          username:
 *              type: string
 *          password:
 *              type: string
 */
userRouter.route('/add').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'User': 'User added successfully' });
        })
        .catch(err => {
            res.status(400).send('Adding new user failed');
        });
});

/**
 * @swagger
 * /user/update/{id}:
 *   post:
 *     tags:
 *       - User
 *     summary: Update user by id.
 *     description: Update user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the user to update.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *                      email:
 *                          type: string
 *     responses:
 *       200:
 *         description: User updated.
 *       400:
 *         description: Update failed.
 *       404:
 *         description: User not found. 
 */
userRouter.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send('User not found');
        else
            user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        user.save().then(user => {
            res.json('User updated');
        })
            .catch(err => {
                res.status(400).send("Update failed");
            });
    });
});

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete user by id.
 *     description: Delete a user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted.
 *       400:
 *         description: Delete failed.
 *       404:
 *         description: User not found.
 */
userRouter.route('/delete/:id').delete(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send('User not found');
        else
            user.delete().then(user => {
                res.json('User deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete failed");
                });
    });


    userRouter.get("/login/:id", (req, res) => {
        res.render("login");
      })
      userRouter.post("/login", async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
          res.send("Please enter all the fields");
          return;
        }
        const doesUserExits = await User.findOne({ email });
    
        if (!doesUserExits) {
          res.send("invalid username or password");
          return;
        }
    
        const doesPasswordMatch = await bcrypt.compare(
          password,
          doesUserExits.password
        );
    
        if (!doesPasswordMatch) {
          res.send("invalid useranme or password");
          return;
        }
    })

});

module.exports = userRouter;