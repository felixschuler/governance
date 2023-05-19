import { Audit } from '../utils/types';
import { useState } from 'react';
import FilterComponent from '../components/FilterComponent';
import AuditTableComponent from '../components/AuditTableComponent';

export interface AuditsProps {
  audits: Audit[];
}

const Audits = ({ audits }: AuditsProps) => {
  const [sortType, setSortType] = useState('NONE');
  const [filterQuery, setFilterQuery] = useState('');
  const [minDate, setMinDate] = useState(
    new Date('2018-01-01').toISOString().split('T')[0]
  );
  const [maxDate, setMaxDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  return (
    <div>
      <h1 className="display-2 mb-5 text-center">Audits</h1>
      <FilterComponent
        filterQuery={filterQuery}
        sortType={sortType}
        minDate={minDate}
        maxDate={maxDate}
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
