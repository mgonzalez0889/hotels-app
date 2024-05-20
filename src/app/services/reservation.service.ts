import {inject, Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _supabase = inject(SupabaseService).supabaseClient;
  constructor() { }

  async postCustomers(customer: any) {
    try {
      const {data} = await this._supabase.from('customers').insert<any>({
        name: customer.name,
        lastname: customer.lastname,
        type_id: customer.type_id,
        identification: customer.identification,
        gender: customer.gender,
        email: customer.email,
        date_birth: customer.date_birth,
        phone: customer.phone,
      }).select()

      const customerObject = data?.reduce((obj, item) => item, {});

      Promise.all([this.postReservation(customer, customerObject.id), this.postPassengers(customer, customerObject.id), this.postContactEmergency(customer, customerObject.id)])
      //await
      //await ;
      //await ;

    }catch (e) {

    }
  }

  private async postPassengers(passenger: any, id: number) {
    try {
      const {data} = await this._supabase.from('passengers').insert<any>({
        name: passenger.ppname,
        lastname: passenger.plastname,
        type_id: passenger.ptype_id,
        identification: passenger.pidentification,
        gender: passenger.pgender,
        email: passenger.pemail,
        date_birth: passenger.p_date_birth,
        phone: passenger.p_phone,
        customer_id: id
      });
    }catch (error) {

    }
  }

  private async postContactEmergency(contact: any, id: number) {
    try {
      const {data} = await this._supabase.from('emergency_contact').insert<any>({
        fullname: contact.e_fullname,
        phone: contact.e_phone,
        customer_id: id
      });
    }catch (error) {

    }
  }

  private async postReservation(reservation: any, id: number) {
    try {
      const {data} = await this._supabase.from('reservation').insert<any>({
        hotel_id: reservation.hotel_id,
        room_id: reservation.room_id,
        check_in: reservation.check_in,
        check_out: reservation.check_out,
        customer_id: id,
        status: reservation.status,
        price: reservation.price_base
      })

    }catch (error) {

    }
  }
}
