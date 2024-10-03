import { ResponseList } from '../../../common/interfaces/response.interface';
import { FilterPayment } from './payment.entity';
import { PaymentValue } from './payment.value';

export interface PaymentRepository {
  createPayment(payment: PaymentValue): Promise<PaymentValue | null>;
  listFilteredPayment(
    filterPayment: FilterPayment,
  ): Promise<ResponseList<PaymentValue>>;
  findPaymentBySaleId(saleId: string): Promise<PaymentValue[]>;
}
