import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

interface IUserRepository {
	create({}: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User | undefined>;
	findById(id: string): Promise<User | undefined>;
}

export { IUserRepository, ICreateUserDTO };
