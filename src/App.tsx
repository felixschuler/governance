import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout';
import Root from './routes/root';
import Auditors from './routes/auditors';
import Audits from './routes/audits';
import Audit from './routes/audit';
import NotFound from './NotFound';
import { getAuditors, getAudits } from './utils/data.service';

function App() {
  const auditors = getAuditors();
  const audits = getAudits();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="auditors" element={<Auditors auditors={auditors} />} />
        <Route path="audits" element={<Audits audits={audits} />} />
        <Route path="audits/:auditId" element={<Audit />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
