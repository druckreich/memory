import {DataSourceComposition, Game, Stone} from '@state/game.models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getRandomElementsFromArray, shuffleArray} from '@app/shared/util/util';
import {createStone} from '@app/shared/util/stone';
import {v4 as uuidv4} from 'uuid';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageGame {

    constructor(public http: HttpClient) {
    }

    public static isValid(unflippedStones: Stone[]): boolean {
        const setIds: string[] = unflippedStones
            .map((s: Stone) => s.key)
            .filter((value, index, self) => self.indexOf(value) === index);

        return setIds.length === 1 && unflippedStones.length === unflippedStones[0].setSize;
    }

    public createStones(game: Game): Observable<Stone[]> {
        const stones: Observable<Stone[]> = this.http.get(game.source.images.source)
            .pipe(
                map((icons: string[]) => {
                    let s: Stone[] = [];
                    const uniqueImages: string[] = getRandomElementsFromArray(icons, game.numberOfSets);
                    for (let i = 0; i < uniqueImages.length; i++) {
                        const set: Stone[] = [];
                        const image: string = uniqueImages[i];
                        const setSize: number = game.elementsPerSet;
                        for (let j = 0; j < setSize; j++) {
                            set.push(createStone(uuidv4(), image, setSize, game.gameMode.type, image));
                        }
                        s = s.concat(set);
                    }
                    return shuffleArray(s);
                })
            );
        return stones;
    }

}


