import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import SupporterProfile from '@modules/users/infra/typeorm/entities/SupporterProfile';
import ISupporterProfileRepository from '@modules/users/repositories/ISupporterProfileRepository';

interface IRequest {
  howDoYouConsidereYourself: number;
  typesOfcauses: string;
  howMuchWantToInvest: number;
  userId: number;
  alreadyInvests: boolean;
  wantToReinvestBalance: boolean;
  wantToReceiveInformation: boolean;
  wantToReceiveEmail: boolean;
}

@injectable()
class SupporterProfileService {
  constructor(
    @inject('SupporterProfileRepository')
    private supporterProfile: ISupporterProfileRepository,
  ) {}

  public async execute({
    alreadyInvests,
    howDoYouConsidereYourself,
    howMuchWantToInvest,
    typesOfcauses,
    wantToReceiveEmail,
    wantToReceiveInformation,
    wantToReinvestBalance,
    userId,
  }: IRequest): Promise<SupporterProfile> {
    const findUser = await this.supporterProfile.findById(userId);

    if (findUser) {
      throw new AppError('Você já respondeu o questionário.');
    }

    const userProfile = await this.supporterProfile.create({
      alreadyInvests,
      howDoYouConsidereYourself,
      howMuchWantToInvest,
      typesOfcauses,
      wantToReceiveEmail,
      wantToReceiveInformation,
      wantToReinvestBalance,
      userId,
    });

    return userProfile;
  }
}

export default SupporterProfileService;
