import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.scss']
})
export class PostOfferFormComponent implements OnInit {

  stepperLabels: Array<string> = ['Create', 'Verify', 'Payment', 'Publish'];

  constructor() { }

  ngOnInit(): void {
  }

}
