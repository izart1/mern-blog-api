import { Schema, model } from 'mongoose';

const TokenModel = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'UserModelSchema' },
  refreshToken: { type: String, required: true },
});

export default model('TokenModelSchema', TokenModel);
