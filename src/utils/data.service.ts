import auditors from '../auditors.json';
import audits from '../audits.json';
import description from '../description.json';
import { Audit } from './types';

export const getAuditors = () => {
  return auditors;
};

export const getAudits = () => {
  return audits;
};

export const getAuditsByAuditor = (auditor: string) => {
  return audits.filter((audit) => audit.auditor === auditor);
};

export const getAuditsByAuditee = (auditee: string) => {
  return audits.filter((audit) => audit.auditee === auditee);
};

export const getEconomicDescription = () => {
  return description.economic;
};

export const getSecurityDescription = () => {
  return description.security;
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

// convert audits to csv
export const convertAuditsToCsv = (audits: Audit[]) => {
  const auditsCopy = [...audits];

  const titles = 'Auditee,Auditor,Date,Report';

  const auditsCsv = auditsCopy.map((audit) => {
    const { auditee, auditor, date, report } = audit;
    return `${auditee},${auditor},${date},${report}`;
  });

  const auditsCsvString = [titles, ...auditsCsv].join('\n');

  return auditsCsvString;
};
