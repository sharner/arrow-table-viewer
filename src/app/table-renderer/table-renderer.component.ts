import { Component, Input } from '@angular/core';
import { tableFromIPC, Table } from "apache-arrow";
import { ArrowTableService } from '../arrow-table.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-renderer',
  templateUrl: './table-renderer.component.html',
  styleUrls: ['./table-renderer.component.css']
})
export class TableRendererComponent {

  @Input() tableContent?: Table;

  constructor(
    private route: ActivatedRoute,
    private tableService: ArrowTableService,
  ) {}

  ngOnInit(): void {
    this.getTableContents();
  }

  getTableContents(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const location = this.tableService.getArrowTableLocation(id);
    if (location === undefined) return;
    this.tableService.getArrowTableContents(location)
      .subscribe(tableContent => {
        this.tableContent = tableFromIPC(new Uint8Array(tableContent));
        console.log(this.tableContent);
      });
  }

  getTableRows(): any[] {
    let rows: any[] = [];
    if (this.tableContent === undefined) {
      return rows;
    }
    const numCols = this.tableContent.numCols;
    const numRows = this.tableContent.numRows;
    const cols = [];
    for (let i = 0; i < numCols; i++) {
      cols.push(this.tableContent.getChildAt(i));
    }
    for (let i = 0; i < numRows; i++) {
      cols.push(this.tableContent.getChildAt(i));
      let row = []
      for (let j = 0; j < numCols; j++) {
        const val = cols[j];
        const cell = val?.get(i);
        // console.log(cell);
        row.push(cell);
      }
      rows.push(row);
    }
    return rows;
  }

  // getArqueroExample(): void {

  // }

}
