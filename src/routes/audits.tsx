import { useState } from 'react';
import AuditTableComponent from '../components/AuditTableComponent';
import FilterComponent from '../components/FilterComponent';
import { Audit } from '../utils/types';

export interface AuditsProps {
  audits: Audit[];
}

const Audits = ({ audits }: AuditsProps) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  const globalMinDate = '2018-01';
  const globalMaxDate = `${year}-${month}`;

  const [sortType, setSortType] = useState('NONE');
  const [filterQuery, setFilterQuery] = useState('');
  const [minDate, setMinDate] = useState('2018-01');
  const [maxDate, setMaxDate] = useState(`${year}-${month}`);

  return (
    <div>
      <h1 className="display-2 mb-5 text-center">Audits</h1>
      <FilterComponent
        filterQuery={filterQuery}
        sortType={sortType}
        minDate={minDate}
        globalMinDate={globalMinDate}
        maxDate={maxDate}
        globalMaxDate={globalMaxDate}
        onFilterQueryChange={setFilterQuery}
        onSortTypeChange={setSortType}
        onMinDateChange={setMinDate}
        onMaxDateChange={setMaxDate}
      />
      <AuditTableComponent
        audits={audits}
        filterQuery={filterQuery}
        sortType={sortType}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default Audits;
