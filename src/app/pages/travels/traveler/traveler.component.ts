import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RoomsService} from "../../../services/rooms.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {initFlowbite} from "flowbite";
import {Router} from "@angular/router";

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export default class TravelerComponent implements OnInit, AfterViewInit{
  roomsService = inject(RoomsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    city: this.fb.control([]),
    check_in: this.fb.control([]),
    check_out: this.fb.control([]),
    adults: this.fb.control([]),
  })

  ngAfterViewInit(): void {

  }

  onSearch() {
    this.roomsService.getAll();
  }

  ngOnInit(): void {
    initFlowbite()
  }

  onSelected(hotel: any, room: any) {
    this.router.navigateByUrl('/travels/reservation')
    console.log(hotel)
    console.log(room)
  }




}
