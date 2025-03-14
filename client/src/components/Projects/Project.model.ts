export interface ProjectInterface {
  name: string;
  status: string;
  id: string;
}

export interface ProjectInterfaceQuery {
  project: ProjectInterface;
}

export interface ProjectData {
  projects: ProjectInterface[];
}
