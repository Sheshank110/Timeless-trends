import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    messages: [messageSchema],
    title: { type: String, default: 'New Conversation' },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
