const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'this field is required'],
	},
	jwt: {
		type: String,
		required: [true, 'this field is required'],
	},
});

const Session = mongoose.model('Session', sessionsSchema);
module.exports = Session;
