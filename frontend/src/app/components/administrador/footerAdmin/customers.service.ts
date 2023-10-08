import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clients } from '../interfaces/clientes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: any = [];

  private customer: BehaviorSubject<clients[]> = new BehaviorSubject<clients[]>([]);
  constructor(private http: HttpClient) { }

  getCustomers() {
    this.http.get('http://localhost:3001/api/Customers').subscribe((value) => {
      this.customers = value;
      this.customer.next(this.customers);
    });
    return this.customer.asObservable();
  }


}
