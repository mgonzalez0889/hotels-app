import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router)

  async logoOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/auth/login');
  }

}
