import {DataSourceComposition, Game, Stone} from '@state/game.models';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {createStone} from '@app/shared/util/stone';
import {v4 as uuidv4} from 'uuid';
import {getRandomElementsFromArray, shuffleArray} from '@app/shared/util/util';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumberGame {

    constructor() {
    }

    public static isValid(unflippedStones: Stone[]): boolean {
        const sum: number = unflippedStones.reduce((subtotal: number, cur: Stone) => {
            return subtotal + +cur.value;
        }, 0);
        return sum === +unflippedStones[0].key;
    }

    public createStones(game: Game): Observable<Stone[]> {
        const stones: Observable<Stone[]> = of(game.source.numbers.source)
            .pipe(
                map((source: any) => {
                    const [proc, range] = source.split('_');
                    let s: Stone[] = [];
                    const numbers: number[] = getRandomElementsFromArray(Array.from(Array(+range).keys()), game.numberOfSets);
                    for (let i = 0; i < game.numberOfSets; i++) {
                        const set: Stone[] = [];
                        const setSize: number = game.elementsPerSet;

                        // elements to use for the stone sources
                        let elements: number[] = [numbers[i]];

                        while (elements.length < setSize) {
                            const biggestElement: number = elements.sort().splice(0, 1)[0];
                            if (elements.length === 0) {
                                elements = [...elements, biggestElement, range - biggestElement];
                            } else {
                                const randomFactor: number = Math.floor(Math.random() * biggestElement);
                                elements = [...elements, randomFactor, biggestElement - randomFactor];
                            }
                        }

                        for (let j = 0; j < setSize; j++) {
                            set.push(createStone(uuidv4(), range, setSize, game.gameMode.type, elements[j].toString()));
                        }
                        s = s.concat(set);
                    }
                    return shuffleArray(s);
                })
            );
        return stones;
    }
}

