const doctorRouter = require('express').Router();
let Doctor = require('../models/doctorModel');

/** 
 * @swagger
 * /doctor:
 *   get:
 *     tags:
 *       - Doctor
 *     summary: List of all doctors.
 *     description: Retrieve a list of all doctors.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
doctorRouter.get('/', function (req, res, next) {
    Doctor.find(function (err, doctor) {
        if (err) {
            console.log(err);
        } else {
            res.json(doctor);
        }
    });
});

/**
 * @swagger
 * /doctor/{id}:
 *   get:
 *     tags:
 *       - Doctor
 *     summary: Get doctor by id.
 *     description: Retrieve a doctor by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the doctor to get.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Error.
 */
doctorRouter.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Doctor.findById(id, function (err, doctor) {
        res.json(doctor);
    });
});

/**
 * @swagger
 * /doctor/add:
 *   post:
 *     tags:
 *       - Doctor
 *     summary: Add doctor.
 *     description: Add doctor.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      fullname:
 *                          type: string
 *                      address:
 *                          type: string
 *                      governorate: 
 *                          type: string
 *                      phone: 
 *                          type: string 
 *                      specialty: 
 *                          type: string
 *                      mode: 
 *                          type: string  
 *     responses:
 *       200:
 *         description: Doctor added successfully.
 *       400:
 *         description: Adding new doctor failed. 
 * 
 * definitions:
 *   Doctor:
 *      type: object
 *      required:
 *          - fullname
 *      properties:
 *          fullname:
 *              type: string
 *          address:
 *              type: string
 *          governorate: 
 *              type: string 
 *          phone: 
 *              type: string 
 *          specialty: 
 *              type: string
 *          mode: 
 *              type: string 
 */
doctorRouter.route('/add').post(function (req, res) {
    let doctor = new Doctor(req.body);
    doctor.save()
        .then(Doctor => {
            res.status(200).json({ 'Doctor': 'Doctor added successfully' });
        })
        .catch(err => {
            res.status(400).send('Adding new doctor failed');
        });
});

/**
 * @swagger
 * /doctor/update/{id}:
 *   post:
 *     tags:
 *       - Doctor
 *     summary: Update doctor by id.
 *     description: Update doctor by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the doctor to update.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      fullname:
 *                          type: string
 *                      address:
 *                          type: string
 *                      governorate: 
 *                          type: string
 *                      phone: 
 *                           type: string 
 *                      specialty: 
 *                          type: string
 *                      mode: 
 *                          type: string  
 *     responses:
 *       200:
 *         description: Doctor updated.
 *       400:
 *         description: Update failed.
 *       404:
 *         description: Doctor not found.
 */
doctorRouter.route('/update/:id').post(function (req, res) {
    Doctor.findById(req.params.id, function (err, doctor) {
        if (!doctor)
            res.status(404).send('Doctor not found');
        else
            doctor.fullname = req.body.fullname;
        doctor.address = req.body.address;
        doctor.governorate = req.body.governorate;
        doctor.phone = req.body.phone;
        doctor.specialty = req.body.specialty;
        doctor.mode = req.body.mode;

        doctor.save().then(doctor => {
            res.json('Doctor updated');
        })
            .catch(err => {
                res.status(400).send("Update failed");
            });
    });
});

/**
 * @swagger
 * /doctor/delete/{id}:
 *   delete:
 *     tags:
 *       - Doctor
 *     summary: Delete doctor by id.
 *     description: Delete a doctor by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the doctor to delete.
 *     responses:
 *       200:
 *         description: Doctor deleted.
 *       400:
 *         description: Delete failed.
 *       404:
 *         description: Doctor not found.
 */
doctorRouter.route('/delete/:id').delete(function (req, res) {
    Doctor.findById(req.params.id, function (err, doctor) {
        if (!doctor)
            res.status(404).send('Doctor not found');
        else
            doctor.delete().then(doctor => {
                res.json('Doctor deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete failed");
                });
    });
});

module.exports = doctorRouter;