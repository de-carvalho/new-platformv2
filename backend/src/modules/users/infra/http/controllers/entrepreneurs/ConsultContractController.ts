/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PDFDocument from 'pdfkit';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppErrors';
import GetUserService from '@modules/users/services/GetUserService';
import Project from '@modules/projects/infra/typeorm/entities/Project';

export default class ConsuletContractController {
  public async create(request: Request, response: Response): Promise<void> {
    const user_id = request.user.id;
    const { project_id } = request.query;

    const doc = new PDFDocument({});
    const name = 'Contrato do Projeto';

    const projectsRepository = getRepository(Project);
    const usersService = container.resolve(GetUserService);
    const user = await usersService.execute(2);

    const project = await projectsRepository.findOne({
      where: { id: project_id, entrepreneurId: parseInt(`${user_id}`) },
    });

    if (!project) {
      throw new AppError('O projeto não foi encontrado');
    }

    response.setHeader('Content-disposition', `inline; filename=${name}.pdf`);

    response.setHeader('Content-type', 'application/pdf');

    doc.fontSize(14).text('FINANCIAMENTOS FIRGUN');
    doc.fontSize(11).moveDown();
    doc.text(`Nome: ${user?.firstName} ${user?.lastName}`);
    doc.text(`Email: ${user?.email}`);
    doc.text(`Tipo do documento: ${user?.taxDocumentType}`);
    doc.text(`Número do documento: ${user?.taxDocumentNumber}`);
    doc.moveDown();
    doc.text(`Projeto: ${project?.name}`);
    doc.text(`Descrição: ${project?.description}`);
    doc.text(`Status: ${project?.state}`);
    doc.text(`Status de pagamento: ${project?.paymentState}`);
    doc.text(`Data de criação: ${project?.creationDate}`);
    doc.text(`Valor Prentendido: R$ ${project?.goal}`);
    doc.text(`Valor Captado: R$ ${project?.raised}`);
    doc.text(`Valor reembolsado: R$ ${project?.totalToPayback}`);
    doc.text(`Categoria: ${project?.category}`);
    doc.text(`Número de parcelas: ${project?.installmentsPrediction}`);
    doc.text(`Número de parcelas pagas: ${project?.installmentsPayed}`);

    doc.pipe(response);
    doc.end();
  }
}
