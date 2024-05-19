import {AfterViewInit, Component, inject} from '@angular/core';
import {HotelsService} from "../../../services/hotels.service";
import {RoomsService} from "../../../services/rooms.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-bedrooms',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './bedrooms.component.html',
  styleUrl: './bedrooms.component.scss'
})
export default class BedroomsComponent implements AfterViewInit{
  hotelsService = inject(HotelsService);
  roomsService = inject(RoomsService);
  private router = inject(Router);


  ngAfterViewInit(): void {
    this.hotelsService.getAllHotels();
  }

  showRooms(hotel: any) {
    this.roomsService.getAllRooms(hotel.id)

  }

  onSelected(room: any) {
    this.router.navigateByUrl('/bedrooms/update/'+ room.id);
    this.roomsService.selected.set(room);
  }

}
