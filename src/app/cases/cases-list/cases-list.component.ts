import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Case } from './../../models/case';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {


  cases = new MatTableDataSource<Case>([])
  displayedColumns: string[] = ['check', 'Numer', 'Edit', 'Temat', 'Aplikacja', 'Status', 'Ważnść',
    'Rodzaj', 'Data wprowadzenia', 'Gwarantowany termin', 'Przydzielona do'];

  checkedList = new Set<string>()
  types: any = {
    "Major": "Serwisowanie (błąd, awaria)",
    "Modification": "Zmiana (CR)",
    "Training": "Wsparcie i administrowanie",
  }

  statuses: any = {
    "Closed_Completed": "Zrealizowane",
    "Open_New": "Nowy",
    "Closed_Canceled": "Anulowane",
    "Open_Assigned": "W realizacji",
    "Open_Frozen": "Zamrożone",
    "Closed_NonAction": "Zaniechane",
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private apiSv: ApiService
  ) { }

  ngAfterViewInit() {
    if (this.paginator)
      this.cases.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.cases.data = this.apiSv.entryListToValueList(await this.apiSv.getModuleEntries("Cases"))
  }

  formDate(d: string): string {
    let date = new Date(d)
    date.setHours(date.getHours() + 2)

    return date.toLocaleString()
  }

  check(id: string): void {
    this.checkedList.has(id) ? this.checkedList.delete(id) : this.checkedList.add(id)
  }
}
