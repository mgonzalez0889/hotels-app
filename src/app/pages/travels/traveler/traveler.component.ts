import {AfterViewInit, Component, inject} from '@angular/core';
import {RoomsService} from "../../../services/rooms.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export default class TravelerComponent implements AfterViewInit{
  roomsService = inject(RoomsService);
  private fb = inject(FormBuilder);

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




}
