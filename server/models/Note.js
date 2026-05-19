import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  pinned: {
    type: Boolean,
    default: false
  },

  archived: {
    type: Boolean,
    default: false
  },

  trashed: {
    type: Boolean,
    default: false
  },

  category: {
    type: String,
    default: "General"
  },

  // IMAGE URL

  image: {
    type: String,
    default: ""
  },

  userId: {
    type: String,
    required: true
  }

});

export default mongoose.model(
  "Note",
  noteSchema
);