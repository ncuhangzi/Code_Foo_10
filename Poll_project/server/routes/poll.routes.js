import express from 'express';

import {createPoll, deletePoll, getAllPolls, getPollDetail, updatePoll} from '../controllers/poll.controller.js';

const router = express.Router();

router.route('/').get(getAllPolls);
router.route('/:id').get(getPollDetail);
router.route('/').post(createPoll);
router.route('/:id').patch(updatePoll);
router.route('/:id').delete(deletePoll);

export default router;