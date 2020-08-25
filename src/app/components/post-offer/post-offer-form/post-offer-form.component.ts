import { Component, OnInit } from '@angular/core';
import { Technology } from '../../../shared/models/technology.model';
import { TECHNOLOGIES } from '../../../shared/technologies';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.scss']
})
export class PostOfferFormComponent implements OnInit {

  stepperLabels: Array<string> = ['Create', 'Verify', 'Payment', 'Publish'];
  technologies: Array<Technology> = TECHNOLOGIES;
  company = '';
  industry = '';
  level = '';
  type = '';
  currency = '';

  constructor() { }

  ngOnInit(): void {
  }

}
