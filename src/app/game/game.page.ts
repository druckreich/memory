import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModalController} from "@ionic/angular";

interface Stone {
    id?: string;
    setId?: string;
    setSize: number;
    icon?: string;
    showFront?: boolean;
    hasBeenFound?: boolean;
}

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    setSize: number = 2;
    sets: number = 6;
    icons: string[];

    stones: Stone[];
    colSize: number = 4;

    backdropClickFn: Function = () => {
    };

    showGame: boolean = false;
    showBackdrop: boolean = false;
    showCountdown: boolean = false;
    counter: string = "";
    countdownHandler: any;

    showTimer: boolean = false;
    miliseconds: number;
    timer: string = "";
    timeoutHandler: any;

    constructor(public modalController: ModalController, public http: HttpClient) {
    }

    ngOnInit() {
        this.showBackdrop = true;
        this.showCountdown = false;
        this.counter = "";
        this.http.get('assets/icons.json').subscribe((icons: string[]) => {
            this.icons = icons;
            this.createGame();
        });
    }

    createGame(): void {
        let stones: Stone[] = [];
        let uniqueSets: string[] = this.getRandomElementsFromArray(this.icons, this.sets);
        for (let i = 0; i < uniqueSets.length; i++) {
            stones = stones.concat(this.createSet(this.setSize, uniqueSets[i]));
        }
        this.stones = stones.sort(() => Math.random() - 0.5);
        this.startCountdown();
    }


    createSet(setSize: number, icon: string): Stone[] {
        let set: Stone[] = [];
        for (let i = 0; i < setSize; i++) {
            set.push({
                id: `${icon}_${i}`,
                setId: icon,
                setSize: this.setSize,
                icon: icon,
                showFront: false,
                hasBeenFound: false
            })
        }
        return set;
    }

    startCountdown(): void {
        this.showGame = true;
        this.showBackdrop = true;
        this.showCountdown = true;
        this.counter = "3";
        this.showTimer = true;
        this.timer = "00:00:00";

        let countdown: number = 3;
        this.countdownHandler = setInterval((counter) => {
            countdown--;
            this.counter = countdown.toString();
            if (countdown == 0) {
                this.counter = "Go";
            }
            if (countdown < 0) {
                clearInterval(this.countdownHandler);
                this.startGame();
            }
        }, 750)
    }

    startGame(): void {
        this.showBackdrop = false;
        this.showCountdown = false;
        this.miliseconds = 0;
        this.timeoutHandler = setInterval(() => {
            this.miliseconds += 10;
            let seconds: number = Math.floor(this.miliseconds / 1000);
            let miliseconds: number = Math.floor((this.miliseconds % 1000) / 10);
            this.timer = `${seconds}.${miliseconds}`;
        }, 10);
    }

    onStoneClick(stone: Stone): void {
        if (stone.showFront == true) {
            return;
        }
        stone.showFront = true;

        let stonesWithFrontShown: Stone[] = this.stones.filter((stone: Stone) => stone.showFront === true && stone.hasBeenFound === false);
        const setIds: string[] = stonesWithFrontShown.map((stone: Stone) => stone.setId).filter((value, index, self) => self.indexOf(value) === index);

        // invalid
        if (setIds.length > 1 && stonesWithFrontShown.length > 1) {
            this.showBackdrop = true;
            this.backdropClickFn = () => {
                stonesWithFrontShown.forEach((stone: Stone) => stone.showFront = false);
                this.showBackdrop = false;
                this.backdropClickFn = () => {
                };
            };
            return;
        }

        // valid
        if (setIds.length === 1 && stonesWithFrontShown.length == this.setSize) {
            this.showBackdrop = true;
            let notFoundStones: Stone[] = this.stones.filter((stone: Stone) => stone.showFront === false);
            if(notFoundStones.length > 0) {
                this.backdropClickFn = () => {
                    stonesWithFrontShown.forEach((stone: Stone) => stone.hasBeenFound = true);
                    this.showBackdrop = false;
                    this.backdropClickFn = () => {
                    };
                };
            } else {
                clearInterval(this.timeoutHandler);
            }

            return;

        }
    }

    getRandomElementsFromArray(arr, n) {
        let result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}
