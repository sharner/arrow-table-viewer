import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArrowTable } from '../arrow_table';
import { ArrowTableService } from '../arrow-table.service';
import { Table } from 'apache-arrow';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent {

  @Input() table?: ArrowTable;
  @Input() tableContent?: Uint8Array;

  constructor(
    private route: ActivatedRoute,
    private tableService: ArrowTableService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTable();
    // his.getTableContents();
  }

  getTable(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tableService.getArrowTable(id)
      .subscribe(table => this.table = table);
      this.tableService.testStaticContent();
  }

  getTableContents(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tableService.getArrowTableContents("foobar")
      .subscribe(tableContent => this.tableContent = tableContent);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.table) {
      this.tableService.updateArrowTable(this.table)
        .subscribe(() => this.goBack());
    }
  }

}
