import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CollapseModule, BsDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
