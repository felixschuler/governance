import data from '../data.json';
import { Audit } from './types';

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

export const getEconomicDescription = () => {
  return data.auditorDescription.economic;
};

export const getSecurityDescription = () => {
  return data.auditorDescription.security;
};

export const getFilteredAndSortedAudits = (
  filterQuery: string,
  sortType: string
) => {
  const audits = getAudits();
  const filteredAudits = filterAudits(audits, filterQuery);
  const sortedAudits = sortAudits(filteredAudits, sortType);

  return sortedAudits;
};

const filterAudits = (audits: Audit[], filterQuery: string) => {
  const auditsCopy = [...audits];

  const filteredAudits = auditsCopy.filter((audit) => {
    if (audit.auditee.toLowerCase().includes(filterQuery.toLowerCase())) {
      return true;
    }

    if (audit.auditor.toLowerCase().includes(filterQuery.toLowerCase())) {
      return true;
    }

    return false;
  });

  return filteredAudits;
};

const sortAudits = (audits: Audit[], sortType: string) => {
  const sortedAudits = [...audits];

  switch (sortType) {
    case 'AUDITEE':
      sortedAudits.sort((a, b) => a.auditee.localeCompare(b.auditee));
      break;
    case 'AUDITOR':
      sortedAudits.sort((a, b) => a.auditor.localeCompare(b.auditor));
      break;
    case 'DATE_ASC':
      sortedAudits.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case 'DATE_DESC':
      sortedAudits.sort((a, b) => b.date.localeCompare(a.date));
      break;
    default:
      break;
  }

  return sortedAudits;
};
