import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  tags: {
    type: String,
  },
  content: {
    type: String,
  },
  readingTime: {
    type: String,
  },
  categories: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  totalViews: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.post || mongoose.model("post", PostSchema);
