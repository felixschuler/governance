import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound';
import Layout from './layout';
import Auditors from './routes/auditors';
import Audits from './routes/audits';
import Root from './routes/root';
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
