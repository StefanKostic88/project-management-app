import mongoose from "mongoose";
import { SchmaTypeNamesForProject } from "../schemaTpes";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

export const Project = mongoose.model(
  SchmaTypeNamesForProject.project,
  ProjectSchema
);
