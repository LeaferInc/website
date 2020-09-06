import { Entrant } from '../user/user';

export class Event {
    constructor(public name: string,
        public description: string,
        public location: string,
        public startDate: Date,
        public endDate: Date,
        public price: number,
        public maxPeople: number,
        public latitude: number,
        public longitude: number,
        public joined: boolean = false,
        public id?: number,
        public entrants?: Entrant[],
        public picture?: string,
        public organizer?: number) { }
}