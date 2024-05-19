import {inject, Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _supabase = inject(SupabaseService).supabaseClient;
  constructor() { }

  async postCustomers(customer: {name: string; lastname: string; type_id: string; identification: string; gender: string; email: string; date_birth: string; phone: string;}) {
    try {
      const response = await this._supabase.from('customers').insert<any>({
        name: customer.name,
        lastname: customer.lastname,
        type_id: customer.type_id,
        identification: customer.identification,
        gender: customer.gender,
        email: customer.email,
        date_birth: customer.date_birth,
        phone: customer.phone,
      })

    }catch (e) {

    }
  }
}
