import { start } from './rest/starter';

export interface Config {
	port: number;
}

(async () => {
	const config: Config = {
		port: Number(process.env.PORT) || 3000,
	};

	start(config);
})();
