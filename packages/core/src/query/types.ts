import { Component } from '../component/types';
import { World } from '../world/world';
import { $modifier, $modifierComponentIds, $modifierID } from './symbols';

export type ModifierFn = ((...components: Component[]) => Component[]) & {
	[$modifier]: string;
	[$modifierID]: number;
	[$modifierComponentIds]: number[];
};

export type Modifier = (...components: Component[]) => ModifierFn;

export type QueryParameter = Component | ReturnType<Modifier>;

export type QuerySubscriber = (type: 'add' | 'remove', entity: number) => void;
