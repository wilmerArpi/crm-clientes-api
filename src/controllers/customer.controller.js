const Customer = require("../schemas/Customer");

const getCustomer = async (req, res)=>{
    try {

        const customers = await Customer.find()
        return res.status(200).json({
            ok:true,
            message: "",
            customers,
        
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            message: "Ocurrió un error con el servidor, inténtalo de nuevo"
            })
    }
}

const createCustomer = async(req, res)=>{
    try {
        const {name, email, empresa, telefono } = req.body

        const newCustomer = new Customer({name, email, empresa, telefono})
        
        const customerSaved = await newCustomer.save()

        return res.status(200).json({
            ok:true,
            message: "Cliente creado con éxito",
            customer: customerSaved,
        
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            message: "Ocurrió un error con el servidor, inténtalo de nuevo"
            })
    }
}

const updateCustomer = async (req, res)=>{
    try {
        const {id, name, email, empresa, telefono} = req.body
        const userExists =await Customer.exists({_id: id})
        
        if (!userExists) 
            return res.status(404).json({
                ok:false,
                message: "No existe el cliente"
            })
        const customerUpdate = await Customer.findByIdAndUpdate(id, {
            $set: {name, email, empresa, telefono},
        }, {
            new: true
        })

        return res.status(200).json({
            ok:true,
            message: "Cliente actualizado con éxito",
            customer: customerUpdate,
        
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            message: "Ocurrió un error con el servidor, inténtalo de nuevo"
            })
    }
}

const deleteCustomer = async (req, res)=>{
    try {
        const {id} = req.body
        const userExists =await Customer.exists({_id: id})
        
        if (!userExists) 
            return res.status(404).json({
                ok:false,
                message: "No existe el cliente"
            })
        
        const customerDeleted = await Customer.deleteOne({_id: id})

        return res.status(200).json({
            ok:true,
            message: "Cliente eliminado con éxito",
            customer: {_id: id, ...customerDeleted},
        
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            message: "Ocurrió un error con el servidor, inténtalo de nuevo"
            })
    }
}

module.exports = {getCustomer, createCustomer, updateCustomer, deleteCustomer}