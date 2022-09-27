const express = require( 'express' );
require( 'dotenv' ).config();
const cors = require( 'cors' );

const app = express();
const PORT = process.env.PORT; // hent portnummer fra env-fil


// ---- DB Mongo og Mongoose
// ------------------------------------------------------------
const mongoose = require( 'mongoose' );

//Lokal DB 
mongoose.connect( process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true } );
//Ekstern DB (fx MongoDB Atlas) - indsæt connectionstring i .env-fil
//mongoose.connect( process.env.DB_URL_EXT, { useNewUrlParser: true, useUnifiedTopology: true } );

const db = mongoose.connection;
db.on( 'error', ( error ) => console.log( "FEJL: " + error ) )
db.once( 'open', () => console.log( "/// ---> MongoDATABSE: Ohøj du der - jeg er din lydige data-slave i denne eksamensopgave!  ¯\\_(ツ)_/¯ " ) )


// ---- APP
// ------------------------------------------------------------
app.use( express.json() );                              // håndter POST/PUT data som json
app.use( express.urlencoded( { extended: true } ) );    // håndter POST/PUT data som urlencoded-data
app.use( cors( { credentials: true, origin: true } ) )  // CORS
app.use( express.static( 'public' ) )                   // Herfra hentes uploadede filer/billeder fra serveren

// ---- SESSION
// ------------------------------------------------------------

const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )

const expire = 1000 * 30 // 1 minut

app.use( session( {

    name: process.env.SESSION_NAME,
    resave: true,
    rolling: false,
    saveUninitialized: false, // 
    store: MongoStore.create( { mongoUrl: process.env.DB_URL } ),
    //store: MongoStore.create( { mongoUrl: process.env.DB_URL_EXT } ),
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: expire,
        sameSite: 'strict', // 'none' 'lax'
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true, // vigtigt - session-cookie som ikke kan manipuleres med javascript
    }
} ) );


// ---- AUTH TJEK - tjek om bruger er "logget ind" (har godkendt cookie)
// ------------------------------------------------------------

// OBS OBS OBS!!! 
// Udkommenter/slet denne del, hvis der skal være adgang til ADMIN-metoder UDEN login

// app.use( '*/admin*', async ( req, res, next ) => {

//     if ( req.session && req.session.userId ) {

//         return next();

//     } else {

//         console.log( "LOGIN AFVIST" )
//         res.set("Connection", "close").status( 401 ).json( { message: 'Du har ikke adgang...' } );
//     }
// } )


// ---- ROUTES
// ------------------------------------------------------------

// GET serverens endpoint - http://localhost:5099/

app.get( '/', async ( req, res ) => {
    console.log( "Velkommen til serverens startside - vælg 1 route hvis du vil andet end denne console-log-sniksnak!" );
    res.status( 200 ).json( {
        message: 'Velkommen til serverens start-endpoint og held og lykke med eksamen!',
        port: "5099",
        about_endpoint: "http://localhost:5099/about",
        contact_endpoint: "http://localhost:5099/contact",
        contactinformation_endpoint: "http://localhost:5099/contactinformation",
        footer_endpoint: "http://localhost:5099/footer",
        login_endpoint: "http://localhost:5099/login",
        newssubscription_endpoint: "http://localhost:5099/newssubscription",
        tours_endpoint: "http://localhost:5099/tours",
        user_endpoint: "http://localhost:5099/user",
        // IMAGES
        about_IMAGE: "http://localhost:5099/images/about/",
        tours_IMAGES: "http://localhost:5099/images/tours/",
    } );
} );

app.use( '/about', require( './routes/about.routes' ) );
app.use( '/contact', require( './routes/contact.routes' ) );
app.use( '/contactinformation', require( './routes/contactinformation.routes' ) );
app.use( '/footer', require( './routes/footer.routes' ) );
app.use( '/login', require( './routes/login.routes' ) );
app.use( '/newssubscription', require( './routes/newssubscription.routes' ) );
app.use( '/tours', require( './routes/tours.routes' ) );
app.use( '/user', require( './routes/user.routes' ) );


// ---- LISTEN
// ------------------------------------------------------------
app.listen( PORT, () =>
    console.log( "/// -----> Jeg er din SERVER og er bare SÅ eksamensklar ... lytter for vildt på din port " + PORT + " ۜʕʘ̅͜ʘ̅ʔ " )
)