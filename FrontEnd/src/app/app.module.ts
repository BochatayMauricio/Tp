import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './administrador/nav-bar/nav-bar.component';
import { PanelAdministradorComponent } from './administrador/panel-administrador/panel-administrador.component';
import { FooterComponent } from './administrador/footer/footer.component';
import { ProductosComponent } from './administrador/productos/productos.component';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './administrador/clientes/clientes.component';
import { VentasComponent } from './administrador/ventas/ventas.component';
import { Navbar2Component } from './administrador/productos/navbar2/navbar2.component';
import { FormularioRegistroComponent } from './administrador/productos/formulario-registro/formulario-registro.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ProducListComponent } from './administrador/productos/produc-list/produc-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormularioModificarComponent } from './administrador/productos/formulario-modificar/formulario-modificar.component';
import { NavBar2Component } from './administrador/clientes/nav-bar2/nav-bar2.component';
import { AdministratorFormComponent } from './administrador/clientes/administrator-form/administrator-form.component';
import { AdministratorsListComponent } from './administrador/clientes/administrators-list/administrators-list.component';
import { ModifyFormAdministratorComponent } from './administrador/clientes/modify-form-administrator/modify-form-administrator.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsComponent } from './administrador/tabs/tabs.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MenuAdministratorComponent } from './administrador/menu-administrator/menu-administrator.component';
import { SalesListComponent } from './administrador/ventas/sales-list/sales-list.component';
import { FilterPipe } from './administrador/ventas/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'',component:PanelAdministradorComponent},
  {path:'Productos',component:ProductosComponent},
  {path:'Clientes',component:ClientesComponent},
  {path:'Ventas', component:VentasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PanelAdministradorComponent,
    FooterComponent,
    ProductosComponent,
    ClientesComponent,
    VentasComponent,
    Navbar2Component,
    FormularioRegistroComponent,
    ProducListComponent,
    FormularioModificarComponent,
    NavBar2Component,
    AdministratorFormComponent,
    AdministratorsListComponent,
    ModifyFormAdministratorComponent,
    TabsComponent,
    MenuAdministratorComponent,
    SalesListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    AlertModule,
    TabsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
