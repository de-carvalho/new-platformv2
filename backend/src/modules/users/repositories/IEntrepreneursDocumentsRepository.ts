import IEntrepreneursDocumentsDTO from '@modules/users/dtos/IEntrepreneurDocumentDTO';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import User from '@modules/users/infra/typeorm/entities/User';
import EntrepreneursDocuments from '../infra/typeorm/entities/EntrepreneursDocuments';

export default interface IEntrepreneursDocumentsRepository {
  create(
    documents: IEntrepreneursDocumentsDTO,
  ): Promise<EntrepreneursDocuments>;
  save(user: EntrepreneursDocuments): Promise<EntrepreneursDocuments>;
  getUserData(userId: number): Promise<EntrepreneursDocuments | undefined>;
  findByIds(
    userId: number,
    projectId: number,
  ): Promise<EntrepreneursDocuments | undefined>;
  findProject(projectId: number): Promise<Project | undefined>;
  findUser(userId: number): Promise<User | undefined>;
}
