import {AfterViewInit, Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HotelsService} from "../../../services/hotels.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-grid-hotels',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './grid-hotels.component.html',
  styleUrl: './grid-hotels.component.scss'
})
export default class GridHotelsComponent implements AfterViewInit{
  hotelsService = inject(HotelsService);
  private router = inject(Router);

  ngAfterViewInit(): void {
    this.hotelsService.getAllHotels();
  }

  onSelected(hotel: any) {
    this.router.navigateByUrl('/hotels/update/'+ hotel.id);
    this.hotelsService.selected.set(hotel);
  }



}
