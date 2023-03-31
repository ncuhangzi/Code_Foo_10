import Poll from '../mongodb/models/poll.js'
import User from '../mongodb/models/user.js';

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllPolls = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        topicType = "",
    } = req.query;

    const query = {};

    if (topicType !== "") {
        query.topicType = topicType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Poll.countDocuments({ query });

        const properties = await Poll.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getPollDetail = async (req, res) => {
    const { id } = req.params;
    const pollExists = await Poll.findOne({ _id: id }).populate(
        "creator",
    );

    if (pollExists) {
        res.status(200).json(pollExists);
    } else {
        res.status(404).json({ message: "Poll not found" });
    }
};
const createPoll = async (req, res) => {
    try {
        const {
            title,
            option,
            topicType,
            votes,
            photo,
            email,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPoll = await Poll.create({
            title,
            option,
            topicType,
            votes,
            photo: photoUrl.url,
            creator: user._id,
        });

        user.allPolls.push(newPoll._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Poll created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updatePoll = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, option, topicType, votes, photo } =
            req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Poll.findByIdAndUpdate(
            { _id: id },
            {
                title,
                option,
                topicType,
                votes,
                photo: photoUrl.url || photo,
            },
        );

        res.status(200).json({ message: "Poll updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deletePoll = async (req, res) => {
    try {
        const { id } = req.params;

        const pollToDelete = await Poll.findById({ _id: id }).populate(
            "creator",
        );

        if (!pollToDelete) throw new Error("Poll not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        //pollToDelete.remove({ session });
        pollToDelete.deleteOne({ _id: id });
        pollToDelete.creator.allPolls.pull(pollToDelete);

        await pollToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Poll deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateVote = async (req, res) => {
    try {
        const { id } = req.params;
        const { option, votes } =
            req.body;

        await Poll.findByIdAndUpdate(
            { _id: id },
            {
                option,
                votes,
            },
        );

        res.status(200).json({ message: "Vote successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllPolls,
    getPollDetail,
    createPoll,
    updatePoll,
    deletePoll,
    updateVote,
}
