import { v4 as uuid } from 'uuid';

class Category {
	id?: string;
	name: string;
	description: string;
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

export default Category;
