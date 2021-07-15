import { Injectable } from '@nestjs/common';
import { Band } from './band';

@Injectable()
export class Bands {
  private _bands: Band[];
  constructor() {
    this._bands = [];
  }

  addBand(band: Band) {
    this._bands.push(band);
  }

  public get bands(): Band[] {
    return this._bands;
  }

  deleteBand(id: string) {
    this._bands = this._bands.filter((band) => band.id !== id);
    return this._bands;
  }

  voteBand(id: string) {
    this._bands.map((band) => {
      if (band.id === id) band.votes++;
      return band;
    });
  }
}
