import customersMdl from "../models/customersMdl.js";
import bcryptjs from "bcryptjs";

const customersCtrl = {};

//GET
customersCtrl.getCustomers = async (req, res) => {
    try {
        const customers = await customersMdl.find();
        res.status(200).json(customers);

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving customers",
            error: error.message
        });
    }
}

//GET by ID
customersCtrl.getCustomerById = async (req, res) => {
    try {
        const customer = await customersMdl.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving customer",
            error: error.message
        });
    }
}

//POST
customersCtrl.createCustomer = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;
        if (!name || !email || !password || !phone || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingCustomer = await customersMdl.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Encrypt the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newCustomer = new customersMdl({
            name,
            email,
            password: hashedPassword,
            phone,
            age
        });
        await newCustomer.save();
        res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({
            message: "Error creating customer",
            error: error.message
        });
    }
}

//PUT
customersCtrl.updateCustomer = async (req, res) => {
    try {
        const { email, password, name, phone, age } = req.body;

        // Validaciones
        if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
            return res.status(400).json({ message: "Name must be at least 2 characters" });
        }

        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            const existingCustomer = await customersMdl.findOne({ email });
            if (existingCustomer && existingCustomer._id.toString() !== req.params.id) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        if (password !== undefined) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message: "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
                });
            }
        }

        if (phone !== undefined) {
            const phoneRegex = /^\d{4}-\d{4}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ message: "Phone must be in the format 0000-0000" });
            }
        }

        if (age !== undefined) {
            if (typeof age !== 'number' || age < 0 || age > 120) {
                return res.status(400).json({ message: "Age must be a number between 0 and 120" });
            }
        }

        // Preparar campos a actualizar
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (email !== undefined) updateFields.email = email;
        if (phone !== undefined) updateFields.phone = phone;
        if (age !== undefined) updateFields.age = age;

        if (password !== undefined) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const updatedCustomer = await customersMdl.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({
            message: "Customer updated successfully",
            customer: updatedCustomer
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating customer",
            error: error.message
        });
    }
};


//DELETE
customersCtrl.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customersMdl.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting customer",
            error: error.message
        });
    }
}

export default customersCtrl;