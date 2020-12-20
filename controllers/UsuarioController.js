const { Usuario } = require('../models/')
const bcrypt = require('bcryptjs')
const servToken = require('../services/token')


module.exports = {

    list : async (req, res, next) => {
        try {
            const re = await Usuario.findAll();
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).send({ message: 'Ocurrió un error' });
            next(error)
        }
        
    },

    add : async (req, res, next) => {
        try {
            //const re = await Usuario.create();
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const reg = await Usuario.create(req.body) //Envia los datos a la bd
            res.status(200).json(reg)
            
        } catch (error) {
            res.status(500).send({ message: 'Ocurrió un error' });
            next(error)
        }
    },
    update: async (req,res,next) => {
        try {
            //Colocar aqui la funcion
            let actPass = req.body.password
            const consulData = await Usuario.findOne({where: { id: req.body.id}})
            if (actPass != consulData.password){
                req.body.password = await bcrypt.hash(actPass, 10)
            }
            const re = await Usuario.update( { nombre: req.body.nombre, password: req.body.password, rol: req.body.rol, email: req.body.email}
                , {where: {id: req.body.id}})
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },
    activate: async (req,res,next) => {
        try {
            //Colocar aqui la funcion
            const re = await Usuario.update({estado:1}, {where: {id:req.body.id}})
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },
    deactivate: async (req,res,next) => {
        try {
            //Colocar aqui la funcion
            const re = await Usuario.update({estado:0}, {where: {id:req.body.id}})
            res.status(200).json(re)
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error) 
        }
    },
    login: async (req, res, next) => {

        try {
                const user = await Usuario.findOne( { where :  { email : req.body.email } } )

                if(user){
                    // Evaluar contraseña
                    const contrasenhaValida = bcrypt.compareSync(req.body.password, user.password)
 
                    if (contrasenhaValida)
                    {
                        const token = servToken.encode(user.id, user.rol)
                        
                        res.status(200).send({
                            auth : true,
                            tokenReturn : token,
                            user : user
                        })

                    }  else {
                        res.status(401).send({auth: false, tokenReturn:null, reason: "Constraseña invalida"} );
                    }

                } else {
                    res.status(404).json({ 'error' : 'Usuario o contraseña invalidos' })
                }

        } catch (error) {
            res.status(500).json({ 'error' : 'Oops paso algo' })
            next(error)
        }
    }
}