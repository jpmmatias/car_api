import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Category from '../entities/Category';
import { Specification } from '../entities/Specification';

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

	@ManyToMany(() => Specification)
	@JoinTable({
		name: 'specifications_cars',
		joinColumns: [{ name: 'car_id' }],
		inverseJoinColumns: [{ name: 'specification_id' }],
	})
	specifications!: Specification[];

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

	private withoutAvailable(available: boolean | undefined) {
		return available === undefined;
	}

	private withoutCreatedAt() {
		return !this.created_at;
	}
}

export default Car;
