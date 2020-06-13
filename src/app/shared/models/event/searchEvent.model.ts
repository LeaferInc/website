/**
 * Contains either a Date or a Location (latitude & longitude)
 */
export class SearchEvent {
    private constructor(
        public startDate?: Date,
        public latitude?: number,
        public longitude?: number,
    ) { }

    /**
     * Generate Search by date
     */
    public static fromDate(startDate: Date): SearchEvent {
        return new SearchEvent(startDate);
    }

    /**
     * Generate search by location (latitude & longitude)
     */
    public static fromLocation(lat: number, long: number): SearchEvent {
        return new SearchEvent(undefined, lat, long);
    }

    /**
     * Encodes to Uri. Either date or location is used.
     * If the date is not null, then no location data will returned.
     * Otherwise, only location is encoded (latitude & longitude)
     */
    public toUrlParams(): string {
        if (this.startDate) {
            return `startDate=${this.startDate.toISOString()}`;
        } else {
            return `latitude=${this.latitude}&longitude=${this.longitude}`;
        }
    }
}