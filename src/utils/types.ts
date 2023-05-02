export type data = {
  auditors: Auditor[];
  audits: Audit[];
};

export type Auditor = {
  id: number;
  name: string;
  type: string;
  projects: string;
  mcap: string;
  clients: string[];
  chains: string[];
  website: string;
};

export type Audit = {
  id: number;
  auditor: string;
  auditee: string;
  date: string;
  paper: string;
};
