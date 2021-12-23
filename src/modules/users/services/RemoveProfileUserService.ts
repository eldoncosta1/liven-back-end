import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';


interface IRequest {
  id: string;
}

@injectable()
class RemoveProfileUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<void> {
    const checkUserExist = await this.usersRepository.findById(id);

    if (!checkUserExist) {
      throw new AppError('User not found.')
    }

    await this.usersRepository.delete(id);

  }
}

export default RemoveProfileUserService;