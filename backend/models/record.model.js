import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"]
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"]
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Record = mongoose.model("Record", recordSchema);

export default Record;