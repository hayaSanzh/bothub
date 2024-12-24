const FeedbackPost = require('../models/feedback.model.js');
const User = require('../models/user.model.js');
const path = require('path');
const bodyParser = require('body-parser');
const { getUser, getLoggedUser } = require('./login.controller.js');
let lastFeedbackId = null;

// GET method of all feedbacks
const getFeedbacks = async (req, res) => {
    try {
        const { category, status, sortBy, sortOrder } = req.query;

        const filters = {};
        if (category) filters.category = category;
        if (status) filters.status = status;

        let feedbacks = await FeedbackPost.find(filters);

        console.log(sortOrder, sortBy);
        if (sortBy === 'votes') {
            feedbacks = feedbacks.sort((a, b) => {
                console.log(a.votes, b.votes);
                return sortOrder === 'desc' ? b.votes - a.votes : a.votes - b.votes;
            });
            console.log(feedbacks);
        } else if (sortBy === 'date') {
            feedbacks = feedbacks.sort((a, b) => {
                return sortOrder === 'desc' ? b.created_at - a.created_at : a.created_at - b.created_at;
            });
        }
        console.log(feedbacks);
        lastFeedbackId = feedbacks.length > 0 ? Math.max(...feedbacks.map(feedback => feedback.id)) : -1;
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST method for creating feedbacks
const postFeedback = async (req, res) => {
    try {
        const loggedUser = getLoggedUser();
        const title = req.body.title;
        const desc = req.body.description;
        const category = req.body.category;
        const author = loggedUser.id
        lastFeedbackId++;
        await FeedbackPost.create({
            id: lastFeedbackId,
            title: title,
            description: desc,
            category: category,
            status: "Idea",
            author_id: author
        });
        res.redirect('/feedbacks');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// PUT method for updating feedbacks
const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedUser = getLoggedUser();
        const author = loggedUser.id
        await FeedbackPost.updateOne(
            {
                'id': id
            }, {
            id: lastFeedbackId,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            status: "Idea",
            author_id: author,
            updated_at: Date.now()
        });
        res.redirect('/feedbacks');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE method for deleting feedback
const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        await FeedbackPost.deleteOne({ id: id });
        res.status(200).redirect('/feedbacks');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// POST method for upvoting
const voteFeedback = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = getLoggedUser().id.toString();
        const feedback = await FeedbackPost.findOne({id: id});
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        feedback.voters = feedback.voters || [];

        if (feedback.voters.includes(userId)) {
            feedback.votes -= 1;
            feedback.voters = feedback.voters.filter((voter) => voter !== userId);
        } else {
            feedback.votes += 1;
            feedback.voters.push(userId);
        }

        await feedback.save();
        res.json({ votes: feedback.votes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Exporting modules
module.exports = {
    getFeedbacks,
    postFeedback,
    updateFeedback,
    deleteFeedback,
    voteFeedback
};