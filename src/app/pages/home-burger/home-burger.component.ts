import { Component } from '@angular/core';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-home-burger',
  templateUrl: './home-burger.component.html',
  styleUrls: ['./home-burger.component.scss']
})
export class HomeBurgerComponent {
  ngOnInit() {
    var scene = document.getElementById('scene');
    var parallaxInstance1 = new Parallax(scene as HTMLElement);

    var scene2 = document.getElementById('scene2');
    var parallaxInstance2 = new Parallax(scene2 as HTMLElement);
  }
  scrollIntoView(event){
    console.log(event);
  }
}



