import mongoose from "mongoose";
import { SchmaTypeNamesForProject } from "../schemaTpes";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export const Client = mongoose.model(
  SchmaTypeNamesForProject.client,
  ClientSchema
);
