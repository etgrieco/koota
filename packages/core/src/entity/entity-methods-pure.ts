import { Relation } from '../relation/types';
import { addTrait, getTrait, removeTrait } from '../trait/trait';
import { ConfigurableTrait, ExtractSchema, Trait, TraitInstance } from '../trait/types';
import { Universe } from '../universe/universe';
import { Entity } from './types';
import { WORLD_ID_SHIFT } from './utils/pack-entity';

export function createAdd(universeRef: { current: Universe }) {
	return function add(this: Entity, ...traits: ConfigurableTrait[]) {
		const worldId = this >>> WORLD_ID_SHIFT;
		const world = universeRef.current.worlds[worldId];
		return addTrait(world, this, ...traits);
	};
}

export function createRemove(universeRef: { current: Universe }) {
	return function (this: Entity, ...traits: Trait[]) {
		const worldId = this >>> WORLD_ID_SHIFT;
		const world = universeRef.current.worlds[worldId];
		return removeTrait(world, this, ...traits);
	};
}

export function createGet(universeRef: { current: Universe }) {
	return function <T extends Trait | Relation<Trait>>(
		this: Entity,
		trait: T
	): TraitInstance<ExtractSchema<T>> | undefined {
		const worldId = this >>> WORLD_ID_SHIFT;
		const world = universeRef.current.worlds[worldId];
		if (!world) {
			debugger;
		}
		return getTrait(world, this, trait as Trait);
	};
}
