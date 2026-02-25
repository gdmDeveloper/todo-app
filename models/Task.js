import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: 'false',
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    group: {
      // Users in same group can create and see group tasks.
      type: Schema.Types.ObjectId,
      ref: 'Group',
      default: 'null',
    },
  },
  { timestamps: true },
);

export default model('Task', taskSchema);
