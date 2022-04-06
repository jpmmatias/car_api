import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

interface IUserRepository {
	create({}: ICreateUserDTO): Promise<void>;
}

export { IUserRepository, ICreateUserDTO };
