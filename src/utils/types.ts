export type data = {
  auditors: Auditor[];
  audits: Audit[];
};

export type Auditor = {
  id: number;
  name: string;
  type: string;
  clients: string;
  notableClients: string[];
  kpis: string[];
  website: string;
  reportsUrl: string;
  source?: Source;
};

export type Audit = {
  id: number;
  auditor: string;
  auditee: string;
  date: string;
  paper: string;
};

type Source = {
  title: string;
  url: string;
};
