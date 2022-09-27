const Tours = require( '../models/tours.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/tours' );
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - tours" );

    try {
        const tours = await Tours.find().sort( [ [ 'title', 1 ] ] );
        return res.status( 200 ).json( tours );

    } catch ( err ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET ALLE "TEASER" ----------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/teaser', async ( req, res ) => {

    console.log( "HENT ALLE - tours" );

    try {
        const tours = await Tours.find( {}, 'title teaser rating traveldate coverimage priceminimum pricemaximum' ).sort( [ [ 'title', 1 ] ] );
        return res.status( 200 ).json( tours );

    } catch ( err ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT  --------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT - tours" );

    try {

        let tours = await Tours.findById( req.params.id );

        if ( tours == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( tours );

    } catch ( error ) {

        console.log( "FEJL: ", error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );

    }

} );


// ----- HENT/GET SØGNING ------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/soeg/:soegeord', async ( req, res ) => {

    console.log( "GET/HENT SØGNING - tours" );

    try {

        const tours = await Tours.find( {
            $or: [
                // søg i title og content -  små bogstaver/i
                { "title": { "$regex": req.params.soegeord, "$options": "i" } },
                { "content": { "$regex": req.params.soegeord, "$options": "i" } },
                { "teaser": { "$regex": req.params.soegeord, "$options": "i" } },
            ]
        } );
        res.json( tours );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------
// 
router.post( '/admin', upload.fields( [ { name: 'image', maxCount: 1 }, { name: 'galleryimages', maxCount: 8 } ] ), async ( req, res ) => {

    console.log( "POST - tours" )

    try {

        let tours = new Tours( req.body );

        // Coverimage - snup filename
        let coverimage = req.files[ 'image' ][ 0 ].filename;

        // Gallery: Snup filenames og placer i array
        let gallery = req.files[ 'galleryimages' ].map( function ( file ) {
            return file.filename; // or file.originalname
        } );


        tours.coverimage = coverimage ? coverimage : "paavej.jpg";
        tours.gallery = gallery ? gallery : [];

        await tours.save();
        return res.status( 201 ).json( { message: "Ny er oprettet", oprettet: tours } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }



} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - tours" )

    try {

        let tours = await Tours.findByIdAndDelete( req.params.id );

        if ( tours == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og slettes', slettet: null } );
        }
        return res.status( 200 ).json( { message: "Tours er slettet", slettet: true } );

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


// ----- RET/PUT - ADMIN ----------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', upload.fields( [ { name: 'image', maxCount: 1 }, { name: 'galleryimages', maxCount: 8 } ] ), async ( req, res ) => {

    console.log( "PUT - tours" )

    try {

        if ( req.files[ 'image' ] ) {
            let coverimage = req.files[ 'image' ][ 0 ].filename;
            req.body.coverimage = coverimage;
        }

        if ( req.files[ 'galleryimages' ] ) {
            // Gallery: Snup filenames og placer i array
            let gallery = req.files[ 'galleryimages' ].map( function ( file ) {
                return file.filename; // or file.originalname
            } );
            req.body.gallery = gallery
        }

        let tours = await Tours.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true } )

        if ( tours == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og rettes', rettet: null } );
        }

        return res.status( 201 ).json( { message: "Tours er rettet", rettet: tours } )

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, rettet: null } );


    }

} );


// ----- PATCH / ADD LIKE TIL PRODUKT ---------------------------------------------- 
// ---------------------------------------------------------------------------------

router.post( '/rating/:id/:rating', async ( req, res ) => {

    console.log( "POST rating - tours" )

    try {

        let tour = await Tours.findById( req.params.id );

        if ( isNaN( +req.params.rating ) ) next( err )

        console.log( req.params.rating )

        let rating = +req.params.rating

        if ( rating <= 5 && rating >= 1 ) {

            // **SIMULERET** beregning af ratings
            let nyrating = Math.ceil( ( tour.rating + rating ) / 2 );
            console.log( nyrating )
            tour.rating = nyrating;
            await tour.save();
            return res.status( 201 ).json( { message: "Rating er tilføjet og beregnet", "opdateret_rating": nyrating } )
        }
        else {
            return res.status( 400 ).json( { message: "Rating blev ikke gennemført pga. i fejl - husk min. 1 og max 5!" } )
        }

    } catch ( error ) {

        return res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );

    }

} )



module.exports = router;