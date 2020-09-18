import { Component, OnInit, ViewChild } from '@angular/core';
import { Technology } from '../../../shared/models/technology.model';
import { TECHNOLOGIES } from '../../../shared/technologies';
import { MapComponent } from '../../map/map.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Offer } from '../../../shared/models/offer.model';

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
  city = '';
  street = '';

  @ViewChild(MapComponent) worldMap: MapComponent;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.verifyToken()
      .subscribe(
        res => console.log(res),
        err => {
          console.log(err);
          if (err.status !== 200) {
            this.router.navigateByUrl('/login');
          }
        }
      );
  }

  resolveLocationCall(): void {
    if (this.city) {
      this.worldMap.resolveLocation(this.city, this.street);
    }
  }

  onSubmit(offerBody: Offer): void {
    console.log(offerBody);
  }


}
