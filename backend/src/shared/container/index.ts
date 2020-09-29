import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IUserPFRepository from '@modules/users/repositories/IUserPFRepository';
import UserPFRepository from '@modules/users/infra/typeorm/repositories/UserPFRepository';

import UserPJRepository from '@modules/users/infra/typeorm/repositories/UserPJRepository';
import IUserPJRepository from '@modules/users/repositories/IUserPJRepository';

import PaymentRepository from '@modules/payments/infra/typeorm/repositories/PaymentsRepository';
import IPaymentRepository from '@modules/payments/repositories/IPaymentsRepository';

import RefundPaymentRepository from '@modules/payments/infra/typeorm/repositories/RefundPaymentRepository';
import IRefundPaymentRepository from '@modules/payments/repositories/IRefundPaymentRepository';

import TransfersRepository from '@modules/payments/infra/typeorm/repositories/TransfersRepository';
import ITransfersRepository from '@modules/payments/repositories/ITransfersRepository';

import BalanceRepository from '@modules/balance/infra/typeorm/repositories/BalanceRepository';
import IBalanceRepository from '@modules/balance/repositories/IGetAccountBalanceRepository';

import SupporterLoanSituationRepository from '@modules/users/infra/typeorm/repositories/supporters/SupporterLoanSituationRepository';
import ISupporterLoanSituationRepository from '@modules/users/repositories/ISupporterLoanSituationRepository';

import SupporterBankStatementRepository from '@modules/users/infra/typeorm/repositories/supporters/SupporterBankStatementRepository';
import ISupporterBankStatementRepository from '@modules/users/repositories/ISupporterBankStatementRepository';

import SupporterDocumentsRepository from '@modules/users/infra/typeorm/repositories/supporters/SupporterDocumentsRepository';
import ISupporterDocumentRepository from '@modules/users/repositories/ISupporterDocumentsRepository';

import SupporterProfileRepository from '@modules/users/infra/typeorm/repositories/supporters/SupporterProfileRepository';
import ISupporterProfileRepository from '@modules/users/repositories/ISupporterProfileRepository';

import EntrepreneurDocumentsRepository from '@modules/users/infra/typeorm/repositories/entrepreneurs/EntrepreneurDocumentsRepository';
import IEntrepreneurDocumentRepository from '@modules/users/repositories/IEntrepreneursDocumentsRepository';

import EntrepreneurBankStatementRepository from '@modules/users/infra/typeorm/repositories/entrepreneurs/EntrepreneurBankStatementRepository';
import IEntrepreneurBankStatementRepository from '@modules/users/repositories/IEntrepreneurBankStamentRepository';

import AdminCheckProjects from '@modules/users/infra/typeorm/repositories/admin/AdminCheckProjectsRepository';
import IAdminCheckProjectsRepository from '@modules/users/repositories/IAdminCheckProjectsRepository';

import ProjectBalanceRepository from '@modules/projects/infra/typeorm/repositories/ProjectBalanceRepository';
import IProjectBalanceRepository from '@modules/projects/repositories/IProjectBalanceRepository';

import EntrepreneurPortfolioRepository from '@modules/users/infra/typeorm/repositories/entrepreneurs/EntrepreneurPortfoliioRepository';
import IEntrepreneurPortfolioRepository from '@modules/users/repositories/IEntrepreneurPortfolioRepository';

import AdminDocumentsToSupporterRepository from '@modules/users/infra/typeorm/repositories/admin/AdminDocumentsToSupporterRepository';
import IAdminDocumentsToSupporterRepository from '@modules/users/repositories/IAdminDocumentsToSupporterRepository';

import AdminDocumentsToEntrepreneurRepository from '@modules/users/infra/typeorm/repositories/admin/AdminDocumentsToEntrepreneurRepository';
import IAdminDocumentsToEntrepreneurRepository from '@modules/users/repositories/IAdminDocumentToEntrepreneurRepository';

import AdminFirgunTeamRepository from '@modules/users/infra/typeorm/repositories/admin/AdminFirgunTeamRepository';
import IAdminFirgunTeamRepository from '@modules/users/repositories/IAdminFirgunTeamRepository';

import AdminAboutFirgunRepository from '@modules/users/infra/typeorm/repositories/admin/AdminAboutFirgunRepository';
import IAdminAboutFirgunRepository from '@modules/users/repositories/IAdminAboutFirgunRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import ICalcRepository from '@modules/calculations/repositories/repositoriesFunctions/InterestFunction';
import InterestRepository from '@modules/calculations/repositories/InterestRepository';

import QuizRepository from '@modules/users/infra/typeorm/repositories/QuizRepository';
import IQuizRepository from '@modules/users/repositories/IQuizRepository';

import QuizAnswerRepository from '@modules/users/infra/typeorm/repositories/QuizAnswerRepository';
import IQuizAnswerRepository from '@modules/users/repositories/IQuizAnswersRepository';

import WithdrawRepository from '@modules/payments/infra/typeorm/repositories/WithdrawRepository';
import IWithdrawRepository from '@modules/payments/repositories/IWithdrawRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IUserPFRepository>(
  'UserPFRepository',
  UserPFRepository,
);

container.registerSingleton<IUserPJRepository>(
  'UserPJRepository',
  UserPJRepository,
);

container.registerSingleton<IPaymentRepository>(
  'PaymentRepository',
  PaymentRepository,
);

container.registerSingleton<IRefundPaymentRepository>(
  'RefundPaymentRepository',
  RefundPaymentRepository,
);

container.registerSingleton<ITransfersRepository>(
  'TransfersRepository',
  TransfersRepository,
);

container.registerSingleton<IBalanceRepository>(
  'BalanceRepository',
  BalanceRepository,
);

container.registerSingleton<ISupporterLoanSituationRepository>(
  'SupporterLoanSituationRepository',
  SupporterLoanSituationRepository,
);

container.registerSingleton<ISupporterBankStatementRepository>(
  'SupporterBankStatementRepository',
  SupporterBankStatementRepository,
);

container.registerSingleton<ISupporterDocumentRepository>(
  'SupporterDocumentsRepository',
  SupporterDocumentsRepository,
);

container.registerSingleton<ISupporterProfileRepository>(
  'SupporterProfileRepository',
  SupporterProfileRepository,
);

container.registerSingleton<IEntrepreneurDocumentRepository>(
  'EntrepreneurDocumentsRepository',
  EntrepreneurDocumentsRepository,
);

container.registerSingleton<IEntrepreneurBankStatementRepository>(
  'EntrepreneurBankStatementRepository',
  EntrepreneurBankStatementRepository,
);

container.registerSingleton<IAdminCheckProjectsRepository>(
  'AdminCheckProjects',
  AdminCheckProjects,
);

container.registerSingleton<IProjectBalanceRepository>(
  'ProjectBalanceRepository',
  ProjectBalanceRepository,
);

container.registerSingleton<IEntrepreneurPortfolioRepository>(
  'EntrepreneurPortfolioRepository',
  EntrepreneurPortfolioRepository,
);

container.registerSingleton<IAdminDocumentsToSupporterRepository>(
  'AdminDocumentsToSupporterRepository',
  AdminDocumentsToSupporterRepository,
);

container.registerSingleton<IAdminDocumentsToEntrepreneurRepository>(
  'AdminDocumentsToEntrepreneurRepository',
  AdminDocumentsToEntrepreneurRepository,
);

container.registerSingleton<IAdminFirgunTeamRepository>(
  'AdminFirgunTeamRepository',
  AdminFirgunTeamRepository,
);

container.registerSingleton<IAdminAboutFirgunRepository>(
  'AdminAboutFirgunRepository',
  AdminAboutFirgunRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<ICalcRepository>(
  'InterestRepository',
  InterestRepository,
);

container.registerSingleton<IQuizAnswerRepository>(
  'QuizAnswerRepository',
  QuizAnswerRepository,
);

container.registerSingleton<IQuizRepository>('QuizRepository', QuizRepository);

container.registerSingleton<IQuizAnswerRepository>(
  'QuizAnswerRepository',
  QuizAnswerRepository,
);

container.registerSingleton<IWithdrawRepository>(
  'WithdrawRepository',
  WithdrawRepository,
);
