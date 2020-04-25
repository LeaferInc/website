import { User } from '../user/user';

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
        public id?: number,
        public organizer?: User) { }
}