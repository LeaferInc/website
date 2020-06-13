import { SearchEvent } from './searchEvent.model';

describe('SearchEvent', () => {
    const startDate: Date = new Date(2020, 10, 1, 10);

    it('should create an instance', () => {
        const searchDate = SearchEvent.fromDate(startDate);
        expect(searchDate).toBeTruthy();
        expect(searchDate.startDate).toBeTruthy();
        expect(searchDate.latitude).toBeFalsy();
        expect(searchDate.longitude).toBeFalsy();

        const searchLocation = SearchEvent.fromLocation(31.44331, 9.3756);
        expect(searchLocation).toBeTruthy();
        expect(searchLocation.startDate).toBeFalsy();
        expect(searchLocation.latitude).toBeTruthy();
        expect(searchLocation.longitude).toBeTruthy();
    });

    it('should return encoded parameters', () => {
        const searchDate = SearchEvent.fromDate(startDate);
        expect(searchDate.toUrlParams()).toBe('startDate=2020-11-01T09:00:00.000Z')

        const searchLocation = SearchEvent.fromLocation(31.44331, 9.3756);
        expect(searchLocation.toUrlParams()).toBe('latitude=31.44331&longitude=9.3756');
    });
});