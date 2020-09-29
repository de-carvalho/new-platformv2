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
class UpdateSupporterProfileService {
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
  }: IRequest): Promise<SupporterProfile | undefined> {
    const findUser = await this.supporterProfile.findById(userId);

    if (!findUser) {
      throw new AppError('Usuário não foi encontrado!');
    }

    findUser.alreadyInvests = alreadyInvests;
    findUser.howDoYouConsidereYourself = howDoYouConsidereYourself;
    findUser.howMuchWantToInvest = howMuchWantToInvest;
    findUser.typesOfcauses = typesOfcauses;
    findUser.wantToReceiveEmail = wantToReceiveEmail;
    findUser.wantToReceiveInformation = wantToReceiveInformation;
    findUser.wantToReinvestBalance = wantToReinvestBalance;

    const updatedProfile = await this.supporterProfile.save(findUser);

    return updatedProfile;
  }
}

export default UpdateSupporterProfileService;
