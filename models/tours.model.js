const mongoose = require( 'mongoose' );

const toursSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Tours: Title/titel er påkrævet!' ]
    },
    teaser: {
        type: String,
        required: [ true, 'Tours: Teaser/kort beskrivelse er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Tours: Content/indhold er påkrævet!' ]
    },
    roomtype: {
        type: String,
        required: [ true, 'Tours: Room type/værelsestype er påkrævet!' ]
    },
    traveldate: {
        type: Date,
        required: [ true, 'Tours: Traveldate/rejsedato er påkrævet!' ]
    },
    duration: {
        type: Number,
        required: [ true, 'Tours: Duration/varighed (antal dage) er påkrævet!' ]
    },
    priceminimum: {
        type: Number,
        required: [ true, 'Tours: Minimum price/minimums-pris er påkrævet!' ]
    },
    pricemaximum: {
        type: Number,
        required: [ true, 'Tours: Maximum price/maximum-pris er påkrævet!' ]
    },
    rating: {
        type: Number,
        min: [1, 'Minimum 1 rating'],
        max: [5, 'Maximum 5 rating'],
        default: 4
    },
    coverimage: {
        type: String,
        required: [ true, 'Tours: Coverimage/forsidefoto er påkrævet!' ]
    },
    gallery: [ { type: String } ]
} )


module.exports = mongoose.model( 'Tours', toursSchema, 'tours' )