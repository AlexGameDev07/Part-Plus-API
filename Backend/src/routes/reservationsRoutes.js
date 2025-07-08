import reservationsCtrl from "../controllers/reservationsCtrl.js";
import express from "express";

const reservationsRoutes = express.Router();

reservationsRoutes.route("/")
    .get(reservationsCtrl.getRervations)
    .post(reservationsCtrl.createReservation);

reservationsRoutes.route("/:id")
    .get(reservationsCtrl.getReservationById)
    .put(reservationsCtrl.updateReservation)
    .delete(reservationsCtrl.deleteReservation);

export default reservationsRoutes;