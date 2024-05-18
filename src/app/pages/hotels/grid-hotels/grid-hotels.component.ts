import {AfterViewInit, Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HotelsService} from "../../../services/hotels.service";

@Component({
  selector: 'app-grid-hotels',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './grid-hotels.component.html',
  styleUrl: './grid-hotels.component.scss'
})
export default class GridHotelsComponent implements AfterViewInit{
  private hotelsService = inject(HotelsService);

  ngAfterViewInit(): void {
    this.hotelsService.getAllHotels();
  }



}
