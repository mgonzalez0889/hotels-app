import {computed, inject, Injectable, signal} from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  private _supabase = inject(SupabaseService).supabaseClient;

  private _state = signal<any>({
    taxes: [],
    loading: false,
    error: false
  });

  //selectors
  taxes = computed(() => this._state().taxes)
  constructor() { }

  async getAllTaxes() {
    try {
      this._state.update((state) =>  ({
        ...state,
        loading: true
      }));
      const {data} = await this._supabase.from('taxes').select()
      if (data ) {
        this._state.update((state) => ({
          ...state,
          taxes: data
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
