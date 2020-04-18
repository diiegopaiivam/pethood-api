const mongoose = require('mongoose');

const IncidentSchema = mongoose.Schema({
    image: String,
    title: String, 
    description: String,
    value: String,
    user_id: String,
}, { 
    toJSON: {
        virtuals: true
    }
}); 

IncidentSchema.virtual('image_url').get(function() {
    return `http://localhost:3333/files/${this.image}`
})


module.exports = mongoose.model('Incident', IncidentSchema);