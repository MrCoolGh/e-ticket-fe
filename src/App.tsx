import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { NonStudentTicketPage } from './pages/NonStudentTicketPage';
import { PaymentStatusPage } from './pages/PaymentStatusPage';
import { TicketDetailsPage } from './pages/TicketDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/buy-ticket/non-student" element={<NonStudentTicketPage />} />
        <Route path="/payment/status" element={<PaymentStatusPage />} />
        <Route path="/ticket/:ticketCode" element={<TicketDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
