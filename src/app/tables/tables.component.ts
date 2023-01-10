import { Component, OnInit } from '@angular/core';
import { ArrowTableService } from '../arrow-table.service';
import { ArrowTable } from '../arrow_table';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  arrowTables: ArrowTable[] = [];

  constructor(private arrowTableService: ArrowTableService, private messageService: MessageService) { }

  getArrowTables(): void {
    this.arrowTableService.getArrowTables()
      .subscribe(tables => this.arrowTables = tables);
  }

  ngOnInit(): void {
    this.getArrowTables();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.arrowTableService.addArrowTable({ name } as ArrowTable)
      .subscribe(table => {
        this.arrowTables.push(table);
      });
  }

  delete(table: ArrowTable): void {
    this.arrowTables = this.arrowTables.filter(h => h !== table);
    this.arrowTableService.deleteArrowTable(table.id).subscribe();
  }

}
