/**
 * clientID
 * vehicle
 * service
 * status
 */

import { Schema, model } from "mongoose";

const ReservationMdl = new Schema({
    clientID: {
        type: Schema.Types.ObjectId,
        ref: "Customers",
        required: true
    },
    vehicle: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid vehicle name!`
        }
    },
    service: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid service name!`
        }
    },
    status: {
        type: String,
        default: "pendiente",
        enum: ["pendiente", "confirmado", "cancelado", "completado"],
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid status!`
        }
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Reservations", ReservationMdl);