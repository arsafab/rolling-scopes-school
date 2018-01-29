import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="logo-block">
      <a routerLink="/">
        <img src="../../../assets/logo.png" alt="To-Do list">
      </a>
    </div>
  `,
  styleUrls: ['./logo.component.scss']
})

export class LogoComponent {
}
