import reservationsMdl from "../models/reservationsMdl.js";

const reservationsCtrl = {};

//GET

reservationsCtrl.getRervations = async (req, res) => {
    try {
        const reservations = await reservationsMdl.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving reservations",
            error: error.message
        });
    }
}

//GET by id
reservationsCtrl.getReservationById = async (req, res) =>{
    try {
        const reservation = await reservationsMdl.findById(req.params.id);
        if (!reservation){
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving reservation",
            error: error.message
        });
    }
}

//POST
reservationsCtrl.createReservation = async (req, res) =>{
    try {
        const { clientID, vehicle, service, status } = req.body;
        if (!clientID || !vehicle || !service || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate vehicle format
        if (!/^[a-zA-Z0-9\s]+$/.test(vehicle)) {
            return res.status(400).json({ message: "Invalid vehicle format" });
        }
        // Validate service format
        if (!/^[a-zA-Z\s]+$/.test(service)) {
            return res.status(400).json({ message: "Invalid service format" });
        }
        // Validate status
        if (!["pendiente", "confirmado", "cancelado", "completado"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const newReservation = new reservationsMdl({
            clientID,
            vehicle,
            service,
            status
        });

        await newReservation.save();
        res.status(201).json({message: "Reservation created successfully", reservation: newReservation});
    } catch (error) {
        res.status(500).json({
            message: "Error creating reservation",
            error: error.message
        });
        
    }
}

//PUT
reservationsCtrl.updateReservation = async (req, res) => {
    try {
        const { clientID, vehicle, service, status } = req.body;

        // Validate vehicle format
        if (!/^[a-zA-Z0-9\s]+$/.test(vehicle)) {
            return res.status(400).json({ message: "Invalid vehicle format" });
        }
        // Validate service format
        if (!/^[a-zA-Z\s]+$/.test(service)) {
            return res.status(400).json({ message: "Invalid service format" });
        }
        // Validate status
        if (!["pendiente", "confirmado", "cancelado", "completado"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedReservation = await reservationsMdl.findByIdAndUpdate(req.params.id, {
            clientID,
            vehicle,
            service,
            status
        }, { new: true });

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({message: "Reservation updated successfully", reservation: updatedReservation});
    } catch (error) {
        res.status(500).json({
            message: "Error updating reservation",
            error: error.message
        });
    }
}

//DELETE
reservationsCtrl.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await reservationsMdl.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({message: "Reservation deleted successfully"});
    } catch (error) {
        res.status(500).json({
            message: "Error deleting reservation",
            error: error.message
        });
    }
}

export default reservationsCtrl;