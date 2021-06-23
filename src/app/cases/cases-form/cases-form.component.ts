import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Case } from './../../models/case';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { nameValueListToObj, objToNameValueList, decodeHtml, encodeHtml } from './../../../common/utility';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-cases-form',
  templateUrl: './cases-form.component.html',
  styleUrls: ['./cases-form.component.scss']
})
export class CasesFormComponent implements OnInit, OnDestroy {


  public id: string | undefined
  public case: Case = new Case()
  public users: any[] = []
  public states: { key: string, value: string }[] = []
  public form = new FormGroup({})
  public subs: Subscription[] = []
  public ckeditorContent: any
  public cfg: AngularEditorConfig = {
    editable: true,
    width: '70vw',
    sanitize: true,
    showToolbar: false
  }


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
  private adminControlNames: string[] = ['type', 'state', 'data_zamkniecia_c', 'status', 'assigned_user_id']
  private controlNames: string[] = ['name', 'description']

  constructor(
    private route: ActivatedRoute,
    private apiSv: ApiService,
    private userSv: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    let controlOptions: any = { updateOn: "change", validators: [Validators.required] }

    for (let adminControlName of this.adminControlNames) {
      let defaulvalue = (this.case as any)[adminControlName]
      this.form.addControl(adminControlName, new FormControl({ value: defaulvalue, disabled: !this.isAdmin }, controlOptions))
    }

    for (let controlName of this.controlNames) {
      let defaulvalue = (this.case as any)[controlName]
      this.form.addControl(controlName, new FormControl(defaulvalue, controlOptions))
    }
  }

  async ngOnInit() {
    this.users = nameValueListToObj(await this.apiSv.getModuleEntries("Users"))
    this.id = this.route.snapshot.params['id']

    if (!this.id)
      return

    let select_fields = this.adminControlNames.concat(this.controlNames).concat(['case_number'])
    this.case = nameValueListToObj(await this.apiSv.getEntry("Cases", this.id, select_fields))[0]
    for (let key of this.adminControlNames.concat(this.controlNames))
      this.form.patchValue({ [key]: (this.case as any)[key] })

    this.form.patchValue({ data_zamkniecia_c: new Date(this.case.data_zamkniecia_c) })
    this.form.patchValue({ description: decodeHtml(this.case.description) })

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

    if (this.case.data_zamkniecia_c instanceof Date) {
      let d = this.case.data_zamkniecia_c
      let year: any = d.getFullYear()
      let month: any = d.getMonth() + 1
      let day: any = d.getDate()
      let hour: any = d.getHours()
      let min: any = d.getMinutes()
      let sec: any = d.getSeconds()

      hour = hour > 9 ? hour : '0' + hour;
      min = min > 9 ? min : '0' + min;
      sec = sec > 9 ? sec : '0' + sec;

      this.case.data_zamkniecia_c = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
    }

    let assignedUser = this.users.find(user => user.id == this.case.assigned_user_id)
    this.case.assigned_user_name = assignedUser.name

    this.case.account_name = 'SID'
    this.case.account_id = '2f37a045-d74d-c4b1-651e-57c51ea4018b'
    this.case.description = encodeHtml(this.case.description)

    if (!this.id) {
      let user = await this.userSv.user
      // this.case.contact_created_by_name = user.name
      this.case.contact_created_by_id = user.id
    }

    let res = await this.apiSv.setEntry("Cases", objToNameValueList(this.case), this.id)

    if (res.id) {
      this.toastr.success((this.id ? "Modyfikowanie" : "Dodawanie") + " zgłoszenia powiodło się")
      this.router.navigateByUrl("/case/view/" + res.id)
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


}
