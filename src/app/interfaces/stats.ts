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