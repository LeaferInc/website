import { Location } from './location.model';

describe("Location Model Test", () => {
    it('should map a Location from an object', () => {
        const obj = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.432068,
                    48.940791
                ]
            },
            "properties": {
                "label": "Rue de l'Abb\u00e9 Niort 93150 Le Blanc-Mesnil",
                "score": 0.5251248330647035,
                "id": "93007_0020",
                "type": "street",
                "x": 658396.42,
                "y": 6871351.94,
                "importance": 0.5263731637117387,
                "name": "Rue de l'Abb\u00e9 Niort",
                "postcode": "93150",
                "citycode": "93007",
                "city": "Le Blanc-Mesnil",
                "context": "93, Seine-Saint-Denis, \u00cele-de-France"
            }
        }

        const loc: Location = Location.mapFromJson(obj);
        expect(loc).toBeTruthy();
        expect(loc.label).toBe("Rue de l'Abbé Niort 93150 Le Blanc-Mesnil");
        expect(loc.lat).toBe(48.940791);
        expect(loc.long).toBe(2.432068);
    });
});