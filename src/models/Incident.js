const mongoose = require('mongoose');
const PointSchema = require('./Utils/PointSchema');

const IncidentSchema = mongoose.Schema({
    image: String,
    title: String, 
    description: String,
    favorite: Boolean,
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { 
    toJSON: {
        virtuals: true
    }
}); 

IncidentSchema.virtual('image_url').get(function() {
    return `${process.env.APP_URL}/files/${this.image}`
})


module.exports = mongoose.model('Incident', IncidentSchema);