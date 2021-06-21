import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Case, CaseFilters } from './../../models/case';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { nameValueListToObj } from './../../../common/utility';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})

export class CasesListComponent implements OnInit, AfterViewInit {

  casesDataSrc = new MatTableDataSource<Case>([])
  displayedColumns: string[] = ['check', 'case_number', 'Edit', 'name', 'account_name', 'status', 'waznosc_c', 'type', 'date_entered', 'termin_realizacji_c', 'assigned_user_name'];
  checkedList = new Set<string>()
  allCases: Case[] = []
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



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private apiSv: ApiService
  ) { }


  async ngOnInit(): Promise<void> {
    this.allCases = nameValueListToObj(await this.apiSv.getModuleEntries("Cases"))
    this.casesDataSrc.data = this.allCases
  }


  ngAfterViewInit() {
    this.casesDataSrc.paginator = this.paginator;
    this.casesDataSrc.sort = this.sort;
  }

  formDate(d: string): string {
    let date = new Date(d)
    date.setHours(date.getHours() + 2)

    return date.toLocaleString()
  }

  check(id: string): void {
    this.checkedList.has(id) ? this.checkedList.delete(id) : this.checkedList.add(id)
  }

  filterCases(filters: any) {
    // console.log(filters);
    let cases = this.allCases
    cases = cases.filter((c: any) => {

      for (let filter in filters) {
        if (!filters[filter])
          continue

        if (filter == "waznosc_c") {
          if (c[filter] != filters[filter])
            return false

          continue
        }

        if (c[filter].toLowerCase().indexOf(filters[filter].toLowerCase()) == -1) return false
      }

      return true
    })

    this.casesDataSrc.data = cases
  }

}