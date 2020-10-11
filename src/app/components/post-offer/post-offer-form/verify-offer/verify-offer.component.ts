import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { OffersService } from '../../../../services/offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-offer',
  templateUrl: './verify-offer.component.html',
  styleUrls: ['./verify-offer.component.scss']
})
export class VerifyOfferComponent implements AfterViewInit {
  stepperLabels: Array<string> = ['Create', 'Verify', 'Payment', 'Publish'];
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private offerService: OffersService, private router: Router) { }

  ngAfterViewInit(): void {
    this.stepper.selectedIndex = 1;
  }

  sendOffer(): void {
    this.offerService.addOffer(this.offerService.getPassOffer()).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    this.goBackToMainPage();
  }

  goBackToMainPage(): void {
    this.router.navigateByUrl('/');
  }

}
