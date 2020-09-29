// Exportando todas funcionalidades relacionadas a Moip
import PaymentBoleto from './Payment/BoletoPayment';
import PaymentCreditCard from './Payment/CreditCardPayment';
import MultiPaymentBoleto from './Payment/BoletoMultiPayment';
import CreateOrder from './Orders/CreateOrder';
import CreateMultiOrder from './Orders/CreateMultiOrders';
import GetMultiOrder from './Orders/GetMultiOrder';
import AccountCPF from './Account/CreateWithCPF';
import AccountCNPJ from './Account/CreateWithCNPJ';
import AccountLisDatas from './Account/ListAccountDatas';
import CustomerCreate from './Customer/CreateCustomer';
import CustomerUpdate from './Customer/UpdateCustomer';
import CustomerListData from './Customer/ListCustomerDatas';
import TransfersCreate from './Transfers/CreateTransfers';
import FirgunTransfersCreate from './Transfers/CreateFirgunTransfers';
import AccountBalance from './Balances/GetAccountBalance';
import CreateWebhooks from './Webhooks/CreateWebhooks';
import GetAllWebhooks from './Webhooks/GetAllWebhooks';
import GeWebhook from './Webhooks/GetWebhook';
import GetAllNotifications from './Webhooks/GetAllNotifications';
import DeleteWebhookNotification from './Webhooks/DeleteNotifications';

const moipServices = {
  PaymentBoleto,
  PaymentCreditCard,
  MultiPaymentBoleto,
  CreateOrder,
  CreateMultiOrder,
  GetMultiOrder,
  AccountCPF,
  AccountCNPJ,
  AccountLisDatas,
  CustomerCreate,
  CustomerUpdate,
  CustomerListData,
  TransfersCreate,
  FirgunTransfersCreate,
  AccountBalance,
  CreateWebhooks,
  GetAllWebhooks,
  GeWebhook,
  GetAllNotifications,
  DeleteWebhookNotification,
};

export default moipServices;
