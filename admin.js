const adminRouter = require('express').Router();
let Admin = require('../models/userModel');

/**
 * @swagger
 * /admin/{email}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin by email.
 *     description: Retrieve an admin by email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the admin to get.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
adminRouter.route('/:email').get(function (req, res) {
    let adminEmail = req.params.email;
    Admin.find({ email: adminEmail }, function (err, admin) {
        res.json(admin);
    });
});

module.exports = adminRouter;