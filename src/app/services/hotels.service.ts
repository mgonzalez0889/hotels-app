import {computed, inject, Injectable, signal} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private _supabase = inject(SupabaseService).supabaseClient;
  private _authService = inject(AuthService);

  private _state = signal<any>({
    hotels: [],
    loading: false,
    error: false
  });

  public selected = signal({});

  //selectors
  hotels = computed(() => this._state().hotels)
  loading = computed(() => this._state().loading)
  error = computed(() => this._state().error)


  constructor() { }

  async getAllHotels() {
    try {
      this._state.update((state) =>  ({
        ...state,
        loading: true
      }));
      const {data} = await this._supabase.from('hotels').select()
      if (data ) {
        this._state.update((state) => ({
          ...state,
          hotels: data
        }))
      }

    }catch (error) {
      this._state.update((state) =>  ({
        ...state,
        error: true
      }));
    }
    finally {
      this._state.update((state) =>  ({
        ...state,
        loading: false
      }));
    }
  }

  async postHotel(hotel: {name: string; address: string; city: string; contact: string; web: string | null, state: boolean}) {
    try {
      const { data: {session} } = await this._authService.session();
      const response = await this._supabase.from('hotels').insert<any>({
        user_id: session?.user.id,
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        contact: hotel.contact,
        web: hotel.web,
        state: hotel.state
      })

    }catch (e) {

    }
  }

  async updateHotel(hotel: {name: string; address: string; city: string; contact: string; web: string | null, state: boolean, id: string}) {
    try {
      const { data: {session} } = await this._authService.session();
      const response = await this._supabase.from('hotels').update<any>({
        ...hotel
      }).eq('id', hotel.id)

    }catch (e) {

    }
  }
}
