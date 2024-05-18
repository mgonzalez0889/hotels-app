import {computed, inject, Injectable, signal} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private _supabase = inject(SupabaseService).supabaseClient;

  private _state = signal<any>({
    hotels: [],
    loading: false,
    error: false
  });

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
}
