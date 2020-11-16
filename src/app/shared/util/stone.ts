import {GameType, Stone, StoneAnimationState} from '@state/game.models';

export function createStone(id: string, setId: string, setSize: number, setType: GameType, source: string): Stone {
    return {
        id,
        key: setId,
        setSize,
        setType,
        value: source,
        state: StoneAnimationState.flipped,
        disabled: false,
        flipped: true,
        found: false
    };
}
