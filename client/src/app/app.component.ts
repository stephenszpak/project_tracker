import { Component, OnInit } from '@angular/core';
// declare var googleyolo: any;

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel, Event as RouterEvent, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router) {
    this._router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  ngOnInit() {
    // const hintPromise = googleyolo.hint({
    //   supportedAuthMethods: [
    //     "https://accounts.google.com"
    //   ],
    //   supportedIdTokenProviders: [
    //     {
    //       uri: "https://accounts.google.com",
    //       clientId: "970146769249-1bka3mvdmadf1c8lgj6usq7hede5qga9.apps.googleusercontent.com"
    //     }
    //   ]
    // });
  }
}


//client secret : DxcFXr9dZuwqZoYg9ZOlVRIo
