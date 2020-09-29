/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PDFDocument from 'pdfkit';

import GetEntrepreneurPortfolio from '@modules/users/services/partners/GetEntrepreneurPortfolioService';

export default class StatementController {
  public async create(request: Request, response: Response): Promise<void> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const doc = new PDFDocument({});
    const name = 'Carteira de empreendedores';

    const entrepreneurPortfolio = container.resolve(GetEntrepreneurPortfolio);

    const entrepreneurData = await entrepreneurPortfolio.execute(
      parseInt(`${user_id}`),
      parseInt(`${project_id}`),
    );

    response.setHeader('Content-disposition', `inline; filename=${name}.pdf`);

    response.setHeader('Content-type', 'application/pdf');

    doc.fontSize(14).text('FINANCIAMENTOS FIRGUN');
    doc.fontSize(11).moveDown();

    // eslint-disable-next-line no-unused-expressions
    entrepreneurData?.map(item => {
      doc.text(`Empreendedor: ${item.userName}`);
      doc.text(`Projeto: ${item.projectName}`);
      doc.text(`Valor do Projeto: ${item.requestedAmount}`);
      doc.text(`Valor recebido: ${item.partnerAmountReceived}`);
      doc.text(`Parcela: ${item.installment}`);
      doc.text(`Status: ${item.status}`);
      doc.text(`Situação: ${item.state}`);
      doc.moveDown();
    });

    doc.pipe(response);
    doc.end();
  }
}
