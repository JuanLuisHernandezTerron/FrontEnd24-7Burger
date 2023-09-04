import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService){

  }
  isLoggedIn = false;

  ngOnInit() {
    this.authService.isLogged.subscribe(res=>{
      this.isLoggedIn = res;
    })
  }

}
