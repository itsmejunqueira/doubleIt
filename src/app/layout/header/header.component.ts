import { AuthService } from './../../auth/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  getRoute(menuItem) {
    if (this.router.url === '/home' && menuItem === "inicio") {
      return "active";
    }
    if (this.router.url === '/produtos' && menuItem === "produtos") {
      return "active";
    }
  }
}
