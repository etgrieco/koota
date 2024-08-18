import { $componentId } from '../component/symbols';
import { Component } from '../component/types';
import { $modifier, $modifierComponentIds, $modifierID } from './symbols';
import { Modifier } from './types';

type Fn = (...components: Component[]) => Component[];

export function modifier<T extends Fn>(name: string, id: number, fn: T): Modifier {
	return function _modifier(...components: Component[]) {
		const componentIds = components.map((component) => component[$componentId]);

		const returnFn = function () {
			return fn(...components);
		};

		Object.assign(returnFn, {
			[$modifier]: name,
			[$modifierID]: id,
			[$modifierComponentIds]: componentIds,
		});

		return returnFn;
	} as Modifier;
}

export function isModifier(target: any): target is ReturnType<Modifier> {
	return typeof target === 'function' && target[$modifier];
}
