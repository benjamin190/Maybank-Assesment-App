import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
      this.app.authenticate(undefined, undefined);
    }

    logout(): any {
      this.http.post('logout', {}).pipe(finalize(() => {
          this.app.authenticated = false;
          localStorage.clear();
          this.router.navigateByUrl('/login');
          console.log("Logged out")
      })).subscribe();
    }

    authenticated() {
        return this.app.authenticated;
    }

}
