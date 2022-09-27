const Newssubscription = require( '../models/newssubscription.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );


// ----- HENT/GET - ADMIN ----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/admin/', async ( req, res ) => {

    console.log( "GET/hent - newssubscription" )

    try {

        let newssubscription = await Newssubscription.find();
        return res.status( 200 ).json( newssubscription );

    } catch ( error ) {

        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT - ADMIN -------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/admin/:id', async ( req, res ) => {

    console.log( "GET/HENT - newssubscription" );

    try {

        let newssubscription = await Newssubscription.findById( req.params.id ); // find udvalgt - snup id'en fra "url'en"

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( newssubscription );

    } catch ( error ) {

        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );

    }
} );


// ----- OPRET/POST ----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - newssubscription" )

    try {

        let newssubscription = new Newssubscription( req.body );
        await newssubscription.save();
        return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: newssubscription } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', async ( req, res ) => {

    console.log( "PUT - newssubscription" )

    try {

        // Husk at id ikke er med i req.body - derfor dur det ikke med res.gaade = req.body;
        let newssubscription = await Newssubscription.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: 'newssubscription er rettet', rettet: newssubscription } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'newssubscription kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - newssubscription" )

    try {

        let newssubscription = await Newssubscription.findByIdAndDelete( req.params.id );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og slettes', slettet: null } );
        }
        return res.status( 200 ).json( { message: "Newssubscription er slettet", slettet: true } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


// ----- SLET/DELETE UD FRA EMAIL - IKKE ADMIN (en besøgende skal kunne afmelde sig med sin email) ------------------------------------------------------------------------------------------------------------ 
// ---------------------------------------------------------------------------------

router.delete( '/afmeld', async ( req, res ) => {

    console.log( "DELETE ud fra EMAIL - newssubscription" )

    try {

        let emailslettes = req.body.email;

        let newssubscription = await Newssubscription.findOne( { email: emailslettes } );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Ingen newssubscription med den email (pas på GDPR!)' } );
        }

        await newssubscription.remove();
        res.status( 200 ).json( { message: 'newssubscription er nu slettet' } )


    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


module.exports = router;