
import {Card} from '../app/game/card.component';
import {Combinaison} from './combinaison.models';

export class ListCombinaison extends Set<Combinaison> {
    lastCombinaison: Combinaison = new Combinaison(new Card(), new Card());
    constructor() {
        super();
    }

    public getLastCombinaison() : Combinaison {
        return this.lastCombinaison;
    }

    public recurenceOfLastCombinaison() : number {
        return this.lastCombinaison.recurence;
    }

    public addCombinaison(card1: Card, card2: Card) {
        let isfunded: boolean = false;
        this.forEach(x => {
            if(x.contains(card1, card2)) {
            isfunded = true;
            x.addRecurent();
            this.lastCombinaison = x;
            return;
            }
        });
        if(!isfunded) {
            let cmb = new Combinaison(card1, card2);
            this.add(cmb);
            this.lastCombinaison = cmb;
        }
    }

    
}