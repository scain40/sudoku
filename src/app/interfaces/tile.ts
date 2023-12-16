import { TileState } from "../enums/tile-state"

/**
 * Interface denoting the state of a tile
 */
export interface Tile {
    value?: number,
    expectedValue?: number,
    state: TileState,
    showExpected: boolean;
}