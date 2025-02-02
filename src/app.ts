import { start } from './rest/starter';

export interface Config {
	port: number;
	apiToken: string;
}

(async () => {
	const config: Config = {
		port: Number(process.env.PORT) || 3000,
		apiToken: process.env.APIKEY || '6af6e3cc-c389-4d1f-96dc-58d3190f70ff',
	};

	start(config);
})();
