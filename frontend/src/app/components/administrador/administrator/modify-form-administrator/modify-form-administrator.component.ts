import { Component, EventEmitter, Input, Output } from '@angular/core';
import { administrator } from '../../interfaces/administrator';
import { AdministratorsService } from '../administrators.service';

@Component({
  selector: 'app-modify-form-administrator',
  templateUrl: './modify-form-administrator.component.html',
  styleUrls: ['./modify-form-administrator.component.scss']
})
export class ModifyFormAdministratorComponent {
  @Input() administratorReceived: any;
  constructor(private adminService: AdministratorsService) { }

  updateAdministrator(email: any, password: any) {

    const administratorModify: administrator = {
      dni: this.administratorReceived.dni,
      name: this.administratorReceived.name,
      surname: this.administratorReceived.surname,
      email: email.value || this.administratorReceived.email,
      password: password.value || this.administratorReceived.password,
    }
    this.adminService.updateAdministrator(administratorModify).subscribe({
      complete: () => this.adminService.retraiveAdministrator(),
      error: (err) => alert('No se realizo correctamente la modificacion')
    });
  }
}
