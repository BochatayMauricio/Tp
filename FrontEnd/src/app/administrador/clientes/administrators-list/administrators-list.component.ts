import { Component, TemplateRef } from '@angular/core';
import { administrator } from '../../interfaces/administrator';
import { AdministratorsService } from '../administrators.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-administrators-list',
  templateUrl: './administrators-list.component.html',
  styleUrls: ['./administrators-list.component.scss']
})
export class AdministratorsListComponent {
  administratorResgisted:administrator[]=[];
  administrator:any;
  constructor(private adminService: AdministratorsService,private modalService: BsModalService){}

  ngOnInit():void {
    this.adminService.retraiveAdministrator().subscribe(respuesta=>this.administratorResgisted=respuesta);
  }

  deleteAdministrator(indice:number){
    const administrator = this.administratorResgisted[indice];
    this.adminService.deleteAdministrator(administrator).subscribe({
      complete:() => this.adminService.retraiveAdministrator(),
      error: (error)=>console.log(error)});
  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index:number) {
    this.administrator = this.administratorResgisted[index];
    this.modalRef = this.modalService.show(template);
  }
}
