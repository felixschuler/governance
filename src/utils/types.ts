export type data = {
  auditors: Auditor[];
  audits: Audit[];
};

export type Auditor = {
  id: number;
  name: string;
  type: string;
  projects: number;
  mcap: number;
};

export type Audit = {
  id: number;
  auditor: string;
  date: string;
  paper: string;
};
