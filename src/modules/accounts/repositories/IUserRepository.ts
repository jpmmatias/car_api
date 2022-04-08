import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';
import IUpateUserDTO from '../dtos/IUpdateUserDTO';

interface IUserRepository {
	create({}: ICreateUserDTO): Promise<void>;
	update(id: string, options: IUpateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User | undefined>;
	findById(id: string): Promise<User | undefined>;
}

export { IUserRepository, ICreateUserDTO };
