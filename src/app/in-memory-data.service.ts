import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ArrowTable } from './arrow_table';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tables = [
      { id: 1, loc: '/ipc/catalog.arrow', name: 'Instrument Catalog' },
      { id: 2, loc: '/ipc/chord-progressions.arrow', name: 'Chord Progressions' },
      { id: 3, loc: '/ipc/aesculap_to_import.arrow', name: 'Aesculap' },
      { id: 4, loc: '/ipc/yellow_tripdata_2022-01.arrow', name: 'Yellow Taxi 2022-01' },
    ];
    return {tables};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(arrowTables: ArrowTable[]): number {
    return arrowTables.length > 0 ? Math.max(...arrowTables.map(table => table.id)) + 1 : 11;
  }
}