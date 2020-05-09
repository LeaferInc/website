export class Location {
  constructor(public label: string, public lat: number, public long: number) {}

  public static mapFromJson(obj: Object): Location {
    const coordinates: Array<number> = obj['geometry']['coordinates'];
    return new Location(obj['properties']['label'], coordinates[1], coordinates[0]);
  }
}
