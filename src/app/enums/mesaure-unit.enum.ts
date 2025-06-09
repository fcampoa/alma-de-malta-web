export enum MeasureUnit {
    Litre = 0,
    Centilitre = 1,
    Millilitre = 2,
    Gram = 3,
    Kilogram = 4,
    Piece = 5,
    Ounce = 6,
    Pound = 7,
    Other = 8
}

export const MeasureUnitLabels: { value: MeasureUnit, label: string }[] = [
    { value: MeasureUnit.Litre, label: 'Litro' },
    { value: MeasureUnit.Centilitre, label: 'Centilitro' },
    { value: MeasureUnit.Millilitre, label: 'Mililitro' },
    { value: MeasureUnit.Gram, label: 'Gramo' },
    { value: MeasureUnit.Kilogram, label: 'Kilogramo' },
    { value: MeasureUnit.Piece, label: 'Pieza' },
    { value: MeasureUnit.Ounce, label: 'Onza' },
    { value: MeasureUnit.Pound, label: 'Libra' },
    { value: MeasureUnit.Other, label: 'Otro' }
];