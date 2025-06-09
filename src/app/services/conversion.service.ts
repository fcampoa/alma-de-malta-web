import { Injectable } from '@angular/core';
import { MeasureUnit } from '../enums/mesaure-unit.enum';

type ConversionKey = `${MeasureUnit}-${MeasureUnit}`;

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private readonly conversions: Partial<Record<ConversionKey, (value: number) => number>> = {
    // Volumen
    [`${MeasureUnit.Litre}-${MeasureUnit.Millilitre}`]: v => v * 1000,
    [`${MeasureUnit.Millilitre}-${MeasureUnit.Litre}`]: v => v / 1000,
    [`${MeasureUnit.Litre}-${MeasureUnit.Centilitre}`]: v => v * 100,
    [`${MeasureUnit.Centilitre}-${MeasureUnit.Litre}`]: v => v / 100,
    [`${MeasureUnit.Centilitre}-${MeasureUnit.Millilitre}`]: v => v * 10,
    [`${MeasureUnit.Millilitre}-${MeasureUnit.Centilitre}`]: v => v / 10,
    [`${MeasureUnit.Millilitre}-${MeasureUnit.Ounce}`]: v => v / 29.57353,
    [`${MeasureUnit.Ounce}-${MeasureUnit.Millilitre}`]: v => v * 29.57353,

    // Peso
    [`${MeasureUnit.Gram}-${MeasureUnit.Kilogram}`]: v => v / 1000,
    [`${MeasureUnit.Kilogram}-${MeasureUnit.Gram}`]: v => v * 1000,
    [`${MeasureUnit.Gram}-${MeasureUnit.Pound}`]: v => v / 453.59237,
    [`${MeasureUnit.Pound}-${MeasureUnit.Gram}`]: v => v * 453.59237,
    [`${MeasureUnit.Gram}-${MeasureUnit.Ounce}`]: v => v / 28.34952,
    [`${MeasureUnit.Ounce}-${MeasureUnit.Gram}`]: v => v * 28.34952,
    [`${MeasureUnit.Kilogram}-${MeasureUnit.Ounce}`]: v => v * 35.27396,
    [`${MeasureUnit.Ounce}-${MeasureUnit.Kilogram}`]: v => v / 35.27396,
    [`${MeasureUnit.Kilogram}-${MeasureUnit.Pound}`]: v => v * 2.20462,
    [`${MeasureUnit.Pound}-${MeasureUnit.Kilogram}`]: v => v / 2.20462
  };

  convert(value: number, from: MeasureUnit, to: MeasureUnit): number {
    if (from === to) return value;
    const key = `${from}-${to}` as ConversionKey;
    const conversion = this.conversions[key];
    if (conversion) {
      return conversion(value);
    }
    throw new Error(`No conversion defined from ${MeasureUnit[from]} to ${MeasureUnit[to]}`);
  }
}