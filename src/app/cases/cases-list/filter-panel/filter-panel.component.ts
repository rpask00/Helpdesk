import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { nameValueListToObj } from './../../../../common/utility';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, OnDestroy {

  users: any[] = []
  form: FormGroup
  sub: Subscription
  @Output('onFilterValueChange') onFilterValueChange = new EventEmitter()

  constructor(
    private apiSv: ApiService
  ) {
    this.form = new FormGroup({
      case_number: new FormControl(''),
      name: new FormControl(''),
      account_name: new FormControl(''),
      type: new FormControl(''),
      state: new FormControl(''),
      status: new FormControl(''),
      assigned_user_id: new FormControl(''),
      waznosc_c: new FormControl(''),
    })

    this.sub = this.form.valueChanges.subscribe(values => this.onFilterValueChange.emit(values))

  }

  async ngOnInit() {
    this.users = nameValueListToObj(await this.apiSv.getModuleEntries("Users"))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}