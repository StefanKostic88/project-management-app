export interface Client {
  name: string;
  email: string;
  phone: string;
  id: string;
}

export interface ClientData {
  clients: Client[];
}

export interface Project {
  name: string;
  status: string;
  id: string;
}

export interface ProjectData {
  projects: Project[];
}
