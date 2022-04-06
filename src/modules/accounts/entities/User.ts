import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	driver_liscence: string;

	@Column()
	admin: boolean;

	@CreateDateColumn()
	created_at?: Date;

	constructor(
		name: string,
		username: string,
		email: string,
		password: string,
		driver_liscence: string
	) {
		if (this.withoutId()) {
			this.id = uuid();
		}

		this.name = name;
		this.password = password;
		this.username = username;
		this.email = email;
		this.admin = false;
		this.driver_liscence = driver_liscence;

		if (this.withoutCreatedAt()) {
			this.created_at = new Date();
		}
	}

	private withoutId() {
		return !this.id;
	}

	private withoutCreatedAt() {
		return !this.created_at;
	}
}

export default User;
