import mongoose, { Schema } from "mongoose";

const tutorialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Tutorial = mongoose.model("Tutorial", tutorialSchema);
