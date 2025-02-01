import { Implementation } from '../config/ImplementationType';
import { InterfacesConfig } from '../config/InterfacesConfigType';
import implementations from '../config/implementations';
import Tx from '../models/interfaces/Tx';
import { TypeOrmTransaction } from '../repositories/typeorm/TypeOrmTransaction';

const injections: { [k: string]: any } = {};

export function GetInjection<T>(
	type: keyof InterfacesConfig | Implementation<T>,
	subReference?: string,
	...args: any[]
) {
	if (typeof type !== 'function') {
		if (!implementations[type]) {
			throw new Error(
				`Implementação não encontrada para a interface ${type} de tipo ${typeof type}`
			);
		}

		type = implementations[type] as Implementation<T>;
	}

	const instanceReference = `${type.name}${!!subReference ? '_' + subReference : ''}`;

	if (!injections[instanceReference]) {
		injections[instanceReference] = new type(...args);
	}

	return function (target: any, propertyKey: string) {
		Object.defineProperty(target, propertyKey, {
			get() {
				return injections?.[instanceReference];
			},
			set() {
				throw new Error('Não é possível alterar a propriedade injetada');
			},
		});
	};
}

export function getInjection<T>(
	type: keyof InterfacesConfig | Implementation<T>,
	subReference?: string,
	...args: any[]
) {
	if (typeof type !== 'function') {
		if (!implementations[type]) {
			throw new Error(
				`Implementação não encontrada para a interface ${type} de tipo ${typeof type}`
			);
		}

		type = implementations[type] as Implementation<T>;
	}

	const instanceReference = `${type.name}${!!subReference ? '_' + subReference : ''}`;

	if (!injections[instanceReference]) {
		console.debug(`injetando ${instanceReference}`);
		injections[instanceReference] = new type(...args);
	}

	return injections?.[instanceReference];
}

export function getTransaction(): Tx {
	return new TypeOrmTransaction();
}
