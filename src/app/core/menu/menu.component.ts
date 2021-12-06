import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menus: Array<PoMenuItem> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menus = this.defineMenu();
  }

  defineMenu(): Array<PoMenuItem> {
    return [
      {
        label: 'Pagina Inicial',
        icon: 'po-icon-home',
        action: () => {
          this.router.navigate(['']);
        },
      },
      {
        label: 'Meus Pedidos',
        shortLabel: 'Vendas',
        icon: 'po-icon-finance',
        action: () => {
          this.router.navigate(['sales']);
        },
      },
    ];
  }
}
