import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  id: String,
  type: String,
  props: mongoose.Schema.Types.Mixed,
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    components: [componentSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
