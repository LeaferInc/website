export class Event {
    constructor(private name: string,
        private description: string,
        private location: string,
        private startDate: Date,
        private endDate: Date,
        private price: number,
        private maxPeople: number,
        private latitude: number,
        private longitude: number) { }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(value: string): void {
        this.description = value;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(value: string): void {
        this.location = value;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(value: Date): void {
        this.startDate = value;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(value: Date): void {
        this.endDate = value;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(value: number): void {
        this.price = value;
    }

    public getMaxPeople(): number {
        return this.maxPeople;
    }

    public setMaxPeople(value: number): void {
        this.maxPeople = value;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(value: number): void {
        this.latitude = value;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(value: number): void {
        this.longitude = value;
    }
}