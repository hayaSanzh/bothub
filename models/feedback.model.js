const mongoose = require('mongoose');

const FeedbackPostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Functionality', 'Bug', 'UI', 'Perfomance']
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['Idea', 'Planned', 'Working', 'Done']
    },
    voters: {
        type: [String],
        default: []
    },
    votes: {
        type: Number,
        default: 0
    },    
    author_id: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const FeedbackPost = mongoose.model('FeedbackPost', FeedbackPostSchema);

module.exports = FeedbackPost;