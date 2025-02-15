import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
	name: 'default',
	type: 'postgres',
	host: '192.168.15.189',
	port: 3055,
	username: 'postgres',
	password: 'hi3t443g',
	database: '',
	synchronize: false,
	entities: [__dirname + '/entities/*.ts'],
});

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err);
	});

export default AppDataSource;
