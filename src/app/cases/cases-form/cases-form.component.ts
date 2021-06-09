import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Case } from './../../models/case';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cases-form',
  templateUrl: './cases-form.component.html',
  styleUrls: ['./cases-form.component.scss']
})
export class CasesFormComponent implements OnInit, OnDestroy {


  id: string | undefined
  case: Case = new Case()
  users: any[] = []
  states: { key: string, value: string }[] = []
  form = new FormGroup({})
  subs: Subscription[] = []

  private statuses: any = {
    "Open": [
      { key: "Open_New", value: "Nowy" },
      { key: "Open_Assigned", value: "W realizacji" },
      { key: "Open_Frozen", value: "Zamrożone" },
    ],
    "Closed": [
      { key: "Closed_Completed", value: "Zrealizowane" },
      { key: "Closed_Canceled", value: "Anulowane" },
      { key: "Closed_NonAction", value: "Zaniechane" },
    ],
    "": []
  }

  private isAdmin = true
  private adminControlNames: string[] = ['type', 'state', 'contact_created_by_id', 'data_zamkniecia_c', 'status', 'assigned_user_id', 'assigned_user_name', 'contact_created_by_name']
  private controlNames: string[] = ['name', 'description']

  constructor(
    private route: ActivatedRoute,
    private apiSv: ApiService,
    private toastr: ToastrService
  ) {
    let controlOptions: any = { updateOn: "blur", validators: [Validators.required] }

    for (let adminControlName of this.adminControlNames)
      this.form.addControl(adminControlName, new FormControl({ value: "", disabled: !this.isAdmin }, controlOptions))

    for (let controlName of this.controlNames)
      this.form.addControl(controlName, new FormControl("", controlOptions))
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id']

    if (this.id) {
      let select_fields = this.adminControlNames.concat(this.controlNames).concat(['case_number'])
      this.case = this.apiSv.entryListToValueList(await this.apiSv.getEntry("Cases", this.id, select_fields))[0]
    }

    this.users = this.apiSv.entryListToValueList(await this.apiSv.getModuleEntries("Users"))

    for (let key of this.adminControlNames.concat(this.controlNames))
      this.form.patchValue({ [key]: (this.case as any)[key] })

    this.form.patchValue({ data_zamkniecia_c: new Date(this.case.data_zamkniecia_c) })
    this.form.patchValue({ description: this.clearString(this.case.description) })

    this.states = this.statuses[this.form.controls["state"].value]
    let sub = this.form.controls["state"].valueChanges.subscribe(s => {
      this.form.patchValue({ status: "" })
      this.states = this.statuses[s]
    })
    this.subs.push(sub)

  }


  async submit() {
    if (this.isAdmin)
      for (let adminControlName of this.adminControlNames)
        (this.case as any)[adminControlName] = this.form.controls[adminControlName].value


    for (let controlName of this.controlNames)
      (this.case as any)[controlName] = this.form.controls[controlName].value

    if (this.case.data_zamkniecia_c instanceof Date)
      this.case.data_zamkniecia_c = this.case.data_zamkniecia_c.toLocaleString().replace(',', '')

    let createUser = this.users.find(user => user.id == this.case.contact_created_by_id)
    let assignedUser = this.users.find(user => user.id == this.case.assigned_user_id)

    this.case.contact_created_by_name = createUser.name
    this.case.assigned_user_name = assignedUser.name
    this.case.account_name = 'SID'

    let res = await this.apiSv.setEntry("Cases", this.apiSv.objToNameValueList(this.case), this.id)
    if (res.id)
      this.toastr.success((this.id ? "Modyfikowanie" : "Dodawanie") + " zgłoszenia powiodło się")
  }



  clearString(str: string) {
    return str ? $.parseHTML($('<textarea />').html(str).text())[0].textContent : str
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}
