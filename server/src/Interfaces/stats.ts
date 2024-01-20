import { Difficulty } from "src/enums/difficulty"

/**
 * Interface denoting difficulty stats
 */
export interface DifficultyStats {
    wins: number,
    losses: number,
    total: number
}

/**
 * Default state for difficulty stats
 */
export var DefaultDifficultyStats: DifficultyStats = {
    wins: 0,
    losses: 0,
    total: 0
}

/**
 * Interface denoting a stat update
 */
export interface StatUpdate {
    difficulty: Difficulty,
    details: {
        wins: number,
        losses: number,
        total: number
    }
}