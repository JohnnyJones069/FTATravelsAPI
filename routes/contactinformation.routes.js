const Contactinformation = require( '../models/contactinformation.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );



// ----- HENT/GET  -----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - contactinformation" )

    try {

        let contactinformation = await Contactinformation.findOne();

        if ( contactinformation == null ) {
            return res.status( 404 ).json( { message: 'Contactinformation kunne ikke findes' } );
        }

        return res.status( 200 ).json( contactinformation );

    } catch ( error ) {

        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin/', async ( req, res ) => {

    console.log( "PUT - contactinformation" )

    try {

        let contactinformation = await Contactinformation.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: 'Contactinformation er rettet', rettet: contactinformation } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- MIDLERTIDIG - POST TIL OPRETTELSE

// router.post( '/admin/', async ( req, res ) => {

//     console.log( "POST - contactinformation" )

//     try {
//         let contactinformation = new Contactinformation( req.body );
//         await contactinformation.save();
//         return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: contactinformation } );
//     } catch ( error ) {
//         console.log(error.message)
//         return res.status( 400 )
//     }

// } );


module.exports = router;