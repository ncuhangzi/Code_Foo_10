import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
    title: { type: String, required: true},
    option: [{ type: Object, required: true}],
    topicType: { type: String, required: true},
    votes: { type: Number, required: true},
    photo: { type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
})

const pollModel = mongoose.model('Poll', PollSchema);

export default pollModel;