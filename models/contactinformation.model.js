const mongoose = require( 'mongoose' );

const contactinformationSchema = new mongoose.Schema( {
    company: {
        type: String,
        required: [ true, 'Contactinformation: Company/firmanavn er påkrævet!' ],
    },
    cvr: {
        type: String,
        required: [ true, 'Contactinformation: CVR-nummer er påkrævet' ],
    },
    address: {
        type: String,
        required: [ true, 'Contactinformation: Address/adresse er påkrævet' ],
    },
    zipcity: {
        type: String,
        required: [ true, 'Contactinformation: Zip and city/Postnummer og by er påkrævet' ],
    },
    country: {
        type: String,
        required: [ true, 'Contactinformation: Country/Land er påkrævet' ],
    },
    phone: {
        type: String,
        required: [ true, 'Contactinformation: Phone/telefonnummer er påkrævet' ],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [ true, 'Contactinformation: Email er påkrævet' ],
    },
    openinghours: {
        type: String,
        required: [ true, 'Contactinformation: Openinghours/åbningstider er påkrævet' ]
    }
} )


module.exports = mongoose.model( 'Contactinformation', contactinformationSchema, 'contactinformation' )