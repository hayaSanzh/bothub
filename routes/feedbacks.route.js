const express = require('express');
const router = express.Router();
const { getFeedbacks, postFeedback, updateFeedback, deleteFeedback, voteFeedback } = require('../controllers/feedbacks.controller.js');

router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);
router.get('/', getFeedbacks);
router.post('/', postFeedback);
router.post('/:id', voteFeedback);

module.exports = router;