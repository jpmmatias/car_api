import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('specifications')
class Specification {
	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at?: Date;

	constructor(name: string, description: string) {
		if (this.withoutId()) {
			this.id = uuid();
		}

		this.name = name;
		this.description = description;

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

export { Specification };
