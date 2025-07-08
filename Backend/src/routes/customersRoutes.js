import customersCtrl from "../controllers/customersCtrl.js";
import express from "express";

const customersRoutes = express.Router();

customersRoutes.route("/")
    .get(customersCtrl.getCustomers)
    .post(customersCtrl.createCustomer);

customersRoutes.route("/:id")
    .get(customersCtrl.getCustomerById)
    .put(customersCtrl.updateCustomer)
    .delete(customersCtrl.deleteCustomer);

export default customersRoutes;