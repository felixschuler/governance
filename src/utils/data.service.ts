import data from '../data.json';

export const getData = () => {
  return data;
};

export const getAuditors = () => {
  return data.auditors;
};

export const getAudits = () => {
  return data.audits;
};

export const getAuditsByAuditor = (auditor: string) => {
  return data.audits.filter((audit) => audit.auditor === auditor);
};

export const getAuditsByAuditee = (auditee: string) => {
  return data.audits.filter((audit) => audit.auditee === auditee);
};
