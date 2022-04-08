import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Category from '../entities/Category';

@Entity('cars')
class Car {
	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	daily_rate: number;

	@Column()
	fine_amount: number;

	@Column()
	liscence_plate: string;

	@Column()
	available!: boolean;

	@Column()
	brand: string;

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'category_id' })
	category!: Category;

	@Column({ nullable: true })
	category_id!: string;

	@CreateDateColumn()
	created_at?: Date;

	constructor(
		brand: string,
		daily_rate: number,
		description: string,
		fine_amount: number,
		liscense_plate: string,
		name: string,
		available?: boolean,
		category_id?: string
	) {
		if (this.withoutId()) {
			this.id = uuid();
		}
		this.brand = brand;
		this.fine_amount = fine_amount;
		this.liscence_plate = liscense_plate;
		this.daily_rate = daily_rate;
		this.name = name;
		this.description = description;

		if (category_id) {
			this.category_id = category_id;
		}

		if (this.withoutAvailable(available)) {
			this.available = true;
		}

		if (this.withoutCreatedAt()) {
			this.created_at = new Date();
		}
	}

	private withoutId() {
		return !this.id;
	}

	private withoutCategory(category_id: string | undefined) {
		return !category_id;
	}

	private withoutAvailable(available: boolean | undefined) {
		return !available;
	}

	private withoutCreatedAt() {
		return !this.created_at;
	}
}

export default Car;
