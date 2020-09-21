import mongoose from "mongoose";
import ms from "ms";
const now = new Date();

const UserVerify = new mongoose.Schema({
  token: {
    type: String,
    trim: true,
    required: true
  },
  dateSent: {
    type: Date,
    default: Date.now
  },
  expires: {
    type: Date,
    default: now.setMinutes(now.getMinutes() + 30),
    index: {
      expires: ms("30m")
    }
  },
  used: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("UserVerify", UserVerify);
