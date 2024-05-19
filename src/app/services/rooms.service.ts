import {computed, inject, Injectable, signal} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private _supabase = inject(SupabaseService).supabaseClient;
  private _authService = inject(AuthService);

  private _state = signal<any>({
    rooms: [],
    loading: false,
    error: false
  });

  public selected = signal({});

  private _typeRoomsState = signal<any>({
    types: [],
    loading: false,
    error: false
  })

  //selectors
  types = computed(() => this._typeRoomsState().types)
  //Selectors rooms
  rooms = computed(() => this._state().rooms)
  loading = computed(() => this._state().loading)
  error = computed(() => this._state().error)
  constructor() { }

  async getAllRooms(id: string) {
    try {
      this._state.update((state) =>  ({
        ...state,
        loading: true
      }));
      const {data} = await this._supabase.from('rooms')
        .select()
        .eq('hotel_id', id)
      if (data) {
        this._state.update((state) =>  ({
          ...state,
          rooms: data
        }));
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
        error: false
      }));
    }
  }

  async getAllTypes() {
    try {
      this._typeRoomsState.update((state) => ({
        ...state,
        loading: true
      }))
      const {data} = await this._supabase.from('types_rooms').select()
      if (data) {
        this._typeRoomsState.update((state) => ({
          ...state,
          types: data
        }))
      }
    }catch (error) {
      this._typeRoomsState.update((state) => ({
        ...state,
        error: true
      }))
    }
    finally {
      this._typeRoomsState.update((state) => ({
        ...state,
        loading: false
      }))
    }
  }

  async postRoom(room: {state: boolean; hotel_id: number; name: string; id_type_room: number; price_base: number; available: boolean, id_taxe: number; location: string}) {
    try {
      const { data: {session} } = await this._authService.session();
      const response = await this._supabase.from('rooms').insert<any>({
        user_id: session?.user.id,
        state: room.state,
        hotel_id: Number(room.hotel_id),
        name: room.name,
        id_type_room: Number(room.id_type_room),
        price_base: Number(room.price_base),
        available: room.available,
        id_taxe: Number(room.id_taxe),
        location: room.location
      });

    }catch (e) {

    }
  }

  async updateRoom(room: {state: boolean; hotel_id: number; name: string; id_type_room: number; price_base: number; available: boolean, id_taxe: number; location: string; id: string}) {
    try {
      const { data: {session} } = await this._authService.session();
      const response = await this._supabase.from('rooms').update<any>({
        ...room
      }).eq('id', room.id)

    }catch (error) {

    }
  }
}
