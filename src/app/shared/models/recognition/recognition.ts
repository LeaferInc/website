import { Organ } from './organ';

export class RecognitionSearch {
    public organ: Organ;
    public image: string;
}

export class RecognitionResult {
    public score: number;
    public name: string;
}