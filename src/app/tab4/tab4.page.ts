import { Component, OnInit } from '@angular/core';
import { CapacitorFlash } from '@capgo/capacitor-flash'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public on_off: boolean;
  public on: boolean;

  constructor() {
    this.on_off = false;
    this.on = false;
  }

  ngOnInit() {
  }

  Control(){
    this.on_off = !this.on_off;
    this.on = !this.on;
    if (this.on_off) {
      CapacitorFlash.switchOn({intensity:100});
    } else{
      CapacitorFlash.switchOff();
    }
  }

}