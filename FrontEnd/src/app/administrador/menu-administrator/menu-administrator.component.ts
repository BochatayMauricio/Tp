import { Component } from '@angular/core';
import { administrator } from '../interfaces/administrator';

@Component({
  selector: 'app-menu-administrator',
  templateUrl: './menu-administrator.component.html',
  styleUrls: ['./menu-administrator.component.scss']
})
export class MenuAdministratorComponent {
  administrator:administrator ={
    name:'Admin1',
    surname:'surname1',
    email:'admin1@gmail.com',
    dni:123456
  }
}
