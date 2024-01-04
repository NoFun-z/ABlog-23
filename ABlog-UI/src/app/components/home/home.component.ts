import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FamousBlogsComponent } from "../blog-components/famous-blogs/famous-blogs.component";
import { RegisterComponent } from "../register/register.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, FamousBlogsComponent, RegisterComponent]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }
}
