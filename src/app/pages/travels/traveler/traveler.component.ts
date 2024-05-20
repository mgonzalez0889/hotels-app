import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RoomsService} from "../../../services/rooms.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {initFlowbite} from "flowbite";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    RouterLink,
  ],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export default class TravelerComponent implements OnInit, AfterViewInit{
  roomsService = inject(RoomsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    city: this.fb.control('',[Validators.required]),
    check_in: this.fb.control('',[Validators.required]),
    check_out: this.fb.control('',[Validators.required]),
    adults: this.fb.control('',[Validators.required]),
  })

  ngAfterViewInit(): void {

  }

  onSearch() {
    if (this.form.invalid) {
      return;
    }
    this.roomsService.getAll();
  }

  ngOnInit(): void {
    initFlowbite();
    this.roomsService._stateRoomsHotels.update((state) => ({
      ...state,
      rooms: []
    }))
  }

  onSelected(hotel: any, room: any) {
    this.router.navigateByUrl('/travels/reservation');
    delete hotel.rooms;
    localStorage.setItem('hotel', JSON.stringify(hotel));
    localStorage.setItem('room', JSON.stringify(room));
    localStorage.setItem('dataPass', JSON.stringify(this.form.getRawValue()));
  }




}
