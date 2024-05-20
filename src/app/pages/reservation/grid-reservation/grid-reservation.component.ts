import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ReservationService} from "../../../services/reservation.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-grid-reservation',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    DatePipe
  ],
  templateUrl: './grid-reservation.component.html',
  styleUrl: './grid-reservation.component.scss'
})
export default class GridReservationComponent implements OnInit{
  reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.reservationService.getAll()
  }

}
