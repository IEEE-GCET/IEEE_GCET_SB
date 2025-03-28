import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: 'No description available',
    required: true,
  },
  advisor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chair:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: {
    type: [String]
  },
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  events: {
    type: [Schema.Types.ObjectId],
    ref: 'Event',
    default: null,
  },
  latestEvents: {
    type: [Schema.Types.ObjectId],
    ref: 'Event',
    default: null,
  }
},{timestamps: true});

export const Society = mongoose.model("Society", societySchema);