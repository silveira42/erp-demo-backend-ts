import { Config } from '../app';
import { restService } from './index';

const start = (config: Config) => {
	restService(config);
};

export { start };
