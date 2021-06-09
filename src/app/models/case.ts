export class Case {
    case_number: string = ''
    account_name: string = ''
    type: string = ''
    contact_created_by_id: string = ''
    data_zamkniecia_c: string | Date = ''
    assigned_user_id: string = ''
    name: string = ''
    description: string = ''
    status: string = ''
    state: string = ''
    contact_created_by_name: string = ''
    assigned_user_name: string = ''
}


export interface CaseFilters {
    case_number: string,
    name: string,
    account_name: string,
    type: string,
    state: string,
    status: string,
    assigned_user_id: string,
    waznosc_c: string,
}