import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArrowTable } from './arrow_table';
import { ARROW_TABLES } from './mock-tables';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, first, tap } from 'rxjs/operators';
import { tableFromIPC, Table } from "apache-arrow";

@Injectable({
  providedIn: 'root'
})
export class ArrowTableService {

  private arrowTablesUrl = 'api/tables';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, 
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`Arrow Table Service: ${message}`);
  }

  getArrowTables(): Observable<ArrowTable[]> {
    return this.http.get<ArrowTable[]>(this.arrowTablesUrl)
    .pipe(
      tap(_ => this.log('fetched arrow tables')),
      catchError(this.handleError<ArrowTable[]>('getArrowTables', []))
    );
  }

  getArrowTable(id: number): Observable<ArrowTable> {
    const url = `${this.arrowTablesUrl}/${id}`;
    return this.http.get<ArrowTable>(url).pipe(
      tap(_ => this.log(`fetched arrow table id=${id}`)),
      catchError(this.handleError<ArrowTable>(`getArrowTable id=${id}`))
    );
  }

  getArrowTableContents(loc: string): Observable<Uint8Array> {
    const url = `/ipc/chord-progressions.arrow`;
    return this.http.get<Uint8Array>(url).pipe(
      tap(_ => this.log(`fetched arrow table contents`)),
      catchError(this.handleError<Uint8Array>(`getArrowTableContents loc=${loc}`))
    );
  }

  testStaticContent() {
    const url = `hello.txt`;
    this.http.get(url).subscribe(console.log);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the table on the server */
  updateArrowTable(table: ArrowTable): Observable<any> {
    return this.http.put(this.arrowTablesUrl, table, this.httpOptions).pipe(
      tap(_ => this.log(`updated table id=${table.id}`)),
      catchError(this.handleError<any>('updateArrowTable'))
    );
  }

  /** POST: add a new table to the server */
  addArrowTable(table: ArrowTable): Observable<ArrowTable> {
    return this.http.post<ArrowTable>(this.arrowTablesUrl, table, this.httpOptions).pipe(
      tap((newTable: ArrowTable) => this.log(`added table w/ id=${newTable.id}`)),
      catchError(this.handleError<ArrowTable>('addArrowTable'))
    );
  }

  /** DELETE: delete the table from the server */
  deleteArrowTable(id: number): Observable<ArrowTable> {
    const url = `${this.arrowTablesUrl}/${id}`;

    return this.http.delete<ArrowTable>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted table id=${id}`)),
      catchError(this.handleError<ArrowTable>('deleteArrowTable'))
    );
  }

  /* GET tables whose name contains search term */
  searchArrowTables(term: string): Observable<ArrowTable[]> {
    if (!term.trim()) {
      // if not search term, return empty table array.
      return of([]);
    }
    return this.http.get<ArrowTable[]>(`${this.arrowTablesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found tables matching "${term}"`) :
        this.log(`no tables matching "${term}"`)),
      catchError(this.handleError<ArrowTable[]>('searchArrowTables', []))
    );
  }

}
