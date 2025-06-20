import api from './api';

interface NonStudentTicketPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface TicketPurchaseResponse {
  message: string;
  paymentUrl: string;
  accessCode: string;
  reference: string;
}

export interface TicketDetailsResponse {
  id: number;
  ticketCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  ticketType: 'STUDENT' | 'NON_STUDENT';
  ticketStatus: 'PENDING_VERIFICATION' | 'PENDING_PAYMENT' | 'PAID' | 'USED' | 'CANCELLED' | 'EXPIRED';
  paymentStatus: 'NOT_REQUIRED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  amount: number;
  qrCodeUrl?: string;
  verificationDocumentUrl?: string;
  institutionName?: string;
  courseOfStudy?: string;
  studentIdNumber?: string;
  createdAt: string;
  usedAt?: string;
}

export const purchaseNonStudentTicket = async (payload: NonStudentTicketPayload) => {
  const { data } = await api.post<TicketPurchaseResponse>('/tickets/purchase/non-student', payload);
  return data;
};

export const getTicketByCode = async (ticketCode: string) => {
  const { data } = await api.get<TicketDetailsResponse>(`/tickets/code/${ticketCode}`);
  return data;
}; 