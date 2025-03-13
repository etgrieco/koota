import { $internal } from '../../common';
import { World } from '../../world/world';

/**
 * TODO: We need one cursor per-universe, probably
 */
export function createTrackingCursor() {
	// Some values are reserved.
	// 0 - has
	// 1 - not
	// 2 - or
	let cursor = 3;

	function createTrackingId() {
		return cursor++;
	}

	function getTrackingCursor() {
		return cursor;
	}

	function setTrackingMasks(world: World, id: number) {
		const ctx = world[$internal];
		const snapshot = structuredClone(ctx.entityMasks);
		ctx.trackingSnapshots.set(id, snapshot);

		// For dirty and changed masks, make clone of entity masks and set all bits to 0.
		ctx.dirtyMasks.set(
			id,
			snapshot.map((mask) => mask.map(() => 0))
		);

		ctx.changedMasks.set(
			id,
			snapshot.map((mask) => mask.map(() => 0))
		);
	}

	return {
		createTrackingId,
		getTrackingCursor,
		setTrackingMasks,
	};
}

const cursor = createTrackingCursor();

export const createTrackingId = cursor.createTrackingId;
export const getTrackingCursor = cursor.getTrackingCursor;
export const setTrackingMasks = cursor.setTrackingMasks;
