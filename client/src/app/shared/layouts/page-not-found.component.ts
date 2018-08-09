import { Component } from '@angular/core';

@Component({
  template:
  `
  <div class="container" fxLayout="row" fxLayout.xs="column" fxFlexFill>
    <div fxFlex="40" fxFlex.xs="25">
      <h1 color="warn">400</h1>
      <h3 class="text-uppercase">Page Not Found !</h3>
      <p class="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND THE WAY HOME</p>
      <a mat-stroked-button routerLink="/home" class="btn-color">Back to home</a>
    </div>
  </div>
  `
})
export class PageNotFoundComponent {}
