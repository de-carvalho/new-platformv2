import InterestFunctions from '@modules/calculations/repositories/repositoriesFunctions/InterestFunction';

import { differenceInCalendarDays, differenceInCalendarMonths } from 'date-fns';

interface ISupporterAmount {
  installmentAmount: number;
  amountTotal: number;
  monthyInterest: number;
  amountCorrected: number;
}

class InterestFunctionsRepository implements InterestFunctions {
  // Calcula o valor mensal por parcela
  public async installmentAmount(
    amount: string,
    times: number,
  ): Promise<number> {
    let interest = '0';

    if (Number(amount) > Number('9000')) {
      interest = '1';
    }
    if (Number(amount) > Number('3000') && Number(amount) < Number('9000')) {
      interest = '0.49';
    }

    const interestUnity = Number(interest) / 100;
    const amountUnity = Number(amount);

    // Cálculo do valor a pagar por cada parcela (PGTO)
    const installment =
      amountUnity *
      (((1 + interestUnity) ** times * interestUnity) /
        ((1 + interestUnity) ** times - 1));

    return installment;
  }

  // Calcula o valor mensal por parcela aplicando possíveis multas ou juros
  public async renegotiation(
    intallmentAmount: string,
    installmentDate: Date,
  ): Promise<number> {
    const INTEREST_LATE = Number(1.00033173); // Juros mensal (Quando o pagamento é atrasado)
    const INTEREST_EARLY = Number(1.00033); // Juros mensal (Quando o pagamento é adiantado)
    const INTEREST_DAY = Number(0.16); // Juros diário (R$ 0,16 = 16 centavos)
    const amountUnity = Number(intallmentAmount); // Valor atual da parcela
    const MUCT = Number(0.02) * amountUnity; // Multa de 2% por atraso no pagamento

    const daysDifference = differenceInCalendarDays(
      installmentDate,
      Date.now(),
    );
    const monthsDifference = differenceInCalendarMonths(
      installmentDate,
      Date.now(),
    );

    let newAmount = amountUnity;

    if (monthsDifference >= 1) {
      newAmount = amountUnity / INTEREST_EARLY ** daysDifference;
    }

    if (monthsDifference < 1 && monthsDifference !== 0) {
      newAmount = amountUnity * INTEREST_LATE ** -daysDifference + MUCT;
    }

    if (monthsDifference === 0) {
      if (daysDifference < 0) {
        // O operador + na incrementação é para inverter o sinal negativo
        // no valor de daysDifference. (Mas a operação decrementa ao invés de incrementar)
        newAmount += INTEREST_DAY * -daysDifference + MUCT;
      } else if (daysDifference > 0) {
        newAmount -= INTEREST_DAY * daysDifference;
      }
    }

    return newAmount;
  }

  // Calcula o valor total a devolver
  public async totalToPayBack(
    installmentAmount: string,
    times: number,
  ): Promise<number> {
    const amount = Number(installmentAmount);

    const totalToPayBack = amount * times;

    return totalToPayBack;
  }

  // Calcula a taxa de juros mensal
  public async monthlyInterest(
    amount: string,
    interest: string,
  ): Promise<number> {
    const amountUnity = Number(amount);
    const interestUnity = Number(interest) / 100;

    const monthlyInterest = amountUnity * interestUnity;

    return monthlyInterest;
  }

  // Calcula o valor que a Firgun irá receber
  public async firgunAmount(amount: string): Promise<number> {
    const amountUnity = Number(amount);
    const percentage = Number('0.08');

    const firgunAmount = amountUnity * percentage;

    return firgunAmount;
  }

  public async partnerAmount(amount: string): Promise<number> {
    const interest = Number('0.5') / 100;

    const amountUnity = Number(amount) * interest;

    return amountUnity;
  }

  // Calcula o valor que o investidor irá receber
  public async supporterAmount(
    amount: string,
    amountEntrepreneur: string,
    balanceDue: string,
    times: number,
  ): Promise<ISupporterAmount> {
    let interest = '0';

    if (Number(amountEntrepreneur) > Number('9000')) {
      interest = '1';
    }
    if (
      Number(amountEntrepreneur) > Number('3000') &&
      Number(amountEntrepreneur) < Number('9000')
    ) {
      interest = '0.49';
    }

    const interestUnity = Number(interest) / 100;
    const amountUnity = Number(amount);
    const balanceReceiveble = Number(balanceDue);

    // Cálculo do valor a receber por cada parcela (PGTO)
    const installment =
      amountUnity *
      (((1 + interestUnity) ** times * interestUnity) /
        ((1 + interestUnity) ** times - 1));

    // Cálculo do valor total a receber
    const totalToReceiveBack = installment * times;

    // Cálculo do valor do juro mensal
    const monthlyInterest = balanceReceiveble * interestUnity;

    // Cálculo do valor amortizado
    const amountCorrected = installment - monthlyInterest;

    const supporterAmount = {
      amountTotal: totalToReceiveBack,
      installmentAmount: installment,
      monthyInterest: monthlyInterest,
      amountCorrected,
    } as ISupporterAmount;

    return supporterAmount;
  }
}

export default InterestFunctionsRepository;
