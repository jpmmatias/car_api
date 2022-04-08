import createConnection from '../../typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

create().then(() => console.log('User admin created'));

async function create() {
	const connection = await createConnection('localhost');
	const id = uuid();
	const password = await hash('admin', 8);

	await connection.query(
		`INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_liscence)
      values('${id}', 'admin', 'admin@admin.com.br', '${password}',true, 'now()', 'xxxxxxx' )
    `
	);

	await connection.close();
}
