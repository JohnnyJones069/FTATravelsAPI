const mongoose = require( 'mongoose' );

const footerSchema = new mongoose.Schema( {

    footertext: {
        type: String,
        required: [ true, 'Footer: Footertext/footer-tekst er påkrævet!' ],
    }
} )


module.exports = mongoose.model( 'Footer', footerSchema, 'footer' )