import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterProfile from '@modules/users/infra/typeorm/entities/SupporterProfile';
import ISupporterProfileRepository from '@modules/users/repositories/ISupporterProfileRepository';

@injectable()
class GetSupporterProfileService {
  constructor(
    @inject('SupporterProfileRepository')
    private supporterProfile: ISupporterProfileRepository,
  ) {}

  public async execute(userId: number): Promise<SupporterProfile | undefined> {
    const findSupporterProfile = await this.supporterProfile.getUserData(
      userId,
    );

    if (!findSupporterProfile) {
      throw new AppError('Nenhum registro foi encontrado.');
    }

    return findSupporterProfile;
  }
}

export default GetSupporterProfileService;
