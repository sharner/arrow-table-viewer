import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArrowTable } from '../arrow_table';
import { ArrowTableService } from '../arrow-table.service';
import { tableFromIPC, Table } from "apache-arrow";
import { HelloWorldService } from '../arrow-action.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent {

  @Input() table?: ArrowTable;
  @Input() hello?: string;

  constructor(
    private route: ActivatedRoute,
    private tableService: ArrowTableService,
    private location: Location,
    private helloService: HelloWorldService
  ) {}

  ngOnInit(): void {
    this.getTable();
    this.getHeathCheck();
  }

  getTable(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.tableService.getArrowTable(id)
    //   .subscribe(table => this.table = table);
    this.table = this.tableService.getArrowTableMock(id);
  }

  getHeathCheck(): void {
    //this.helloService.hello();
    this.helloService.doAction()
      .subscribe((h) => {
        if (h !== "done") {
          console.log("Appending to hello "+h);
          this.hello = h;
        }
      });
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
