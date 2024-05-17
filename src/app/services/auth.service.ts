import {inject, Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {SignUpWithPasswordCredentials} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _supabaClient = inject(SupabaseService).supabaseClient
  constructor() { }

  session() {
    this._supabaClient.auth.getSession();
  }
  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaClient.auth.signUp(credentials);
  }

  login(credentials: SignUpWithPasswordCredentials) {
    return this._supabaClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this._supabaClient.auth.signOut();
  }



}
