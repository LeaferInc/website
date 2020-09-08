export enum Organ {
    LEAF = 'leaf',
    FLOWER = 'flower'
}

export enum OrganFr {
    LEAF = 'feuille',
    FLOWER = 'fleur'
}

/**
 * Translates a french organ to an english one
 * @param value the french organ
 */
export function translateOrgan(value: OrganFr): Organ {
    switch(value) {
        case OrganFr.LEAF: return Organ.LEAF;
        case OrganFr.FLOWER: return Organ.FLOWER;
        default: throw new Error('Unsupported Organ');
    }
}