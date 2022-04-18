import Specification from '@modules/car/infra/typeorm/entities/Specification';
// DTO => Data transfer object
export default interface ICreateUserDTO {
	driver_liscence: string;
	name: string;
	email: string;
	password: string;
	specifications?: Specification[];
}
