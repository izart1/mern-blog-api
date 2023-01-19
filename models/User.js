import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    // isActivated: {
    //   type: Boolean,
    //   default: false,
    // },
    // activationLink: {
    //   type: String,
    // },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
