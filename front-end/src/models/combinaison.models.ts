import {Card} from '../app/game/card.component';

export class Combinaison extends Set<Card> {
    recurence: number = 0;
    constructor(card1: Card, card2: Card) {
        super();
        this.add(card1).add(card2);
        this.recurence = 1;
    }

    public addRecurent() {
        this.recurence++;
    }

    public contains(card1: Card, card2:Card) {
        return this.has(card1) && this.has(card2);
    }
}
