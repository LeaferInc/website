import { Event } from './event.model';

describe('Event Model Tests', () => {
    const startDate: Date = new Date();
    const endDate: Date = new Date();

    it('should get all attributes', () => {
        const event: Event = new Event("Test name", "Test description", "Test location",
        startDate, endDate, 10, 100, 41.8, 4.2);

        expect(event.getName()).toBe("Test name");
        expect(event.getDescription()).toBe("Test description");
        expect(event.getLocation()).toBe("Test location");
        expect(event.getStartDate()).toBe(startDate);
        expect(event.getEndDate()).toBe(endDate);
        expect(event.getPrice()).toBe(10);
        expect(event.getMaxPeople()).toBe(100);
        expect(event.getLatitude()).toBe(41.8);
        expect(event.getLongitude()).toBe(4.2);
    });
});