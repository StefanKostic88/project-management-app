import { Client } from "../Clients/Client.model";

export interface ProjectInterface {
  name: string;
  status: string;
  id: string;
  description: string;
  client: Client;
}

export interface ProjectInterfaceQuery {
  project: ProjectInterface;
}

export interface ProjectData {
  projects: ProjectInterface[];
}
