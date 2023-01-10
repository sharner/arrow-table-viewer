import { Component, OnInit } from '@angular/core';
import { ArrowTableService } from '../arrow-table.service';
import { ArrowTable } from '../arrow_table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  tables: ArrowTable[] = [];

  constructor(private tableService: ArrowTableService) { }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(): void {
    this.tableService.getArrowTables()
      .subscribe(tables => this.tables = tables.slice(1, 5));
  }
}