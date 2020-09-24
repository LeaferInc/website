import { Component, OnInit, OnDestroy } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-premium-home',
  templateUrl: './premium-home.component.html',
  styleUrls: ['./premium-home.component.scss'],
})
export class PremiumHomeComponent implements OnInit, OnDestroy {
  private stripe: Stripe;
  private card: StripeCardElement;
  public loading = false;
  public isPremium = false;

  public orderForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  private sub: Subscription = new Subscription();

  constructor(private paymentService: PaymentService, public authService: AuthService) {}

  async ngOnInit() {
    this.sub.add(
      this.authService
        .getUserAuth()
        .pipe(filter((userAuth) => userAuth && !userAuth?.user?.premium))
        .subscribe({
          next: async (userAuth) => {
            this.stripe = await loadStripe(
              'pk_test_51H2EBRFeBcGJPpInMpthBFElJzuhvjhH5v2XYG1iUVOt7eNWvgW74crpuJk9foes2htTYR4VFbbgwsH6aES5oMqa00xT85dK9d'
            );
            const elements = this.stripe.elements();

            this.card = elements.create('card');

            this.card.mount('#card-element');

            this.card.on('change', function (event) {
              var displayError = document.getElementById('card-errors');
              if (event.error) {
                displayError.textContent = event.error.message;
              } else {
                displayError.textContent = '';
              }
            });
          },
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onPay() {
    for (const key in this.orderForm.controls) {
      this.orderForm.controls[key].markAsDirty();
      this.orderForm.controls[key].updateValueAndValidity();
    }

    if (this.orderForm.invalid) {
      return;
    }

    const cardEl = this.card;

    this.loading = true;

    this.sub.add(
      this.paymentService.createPaymenIntent().subscribe({
        next: async (paymentClientSecret) => {
          const res = await this.stripe.confirmCardPayment(paymentClientSecret.clientSecret, {
            payment_method: {
              card: this.card,
              billing_details: {
                name: this.orderForm.get('name').value,
                address: this.orderForm.get('address').value,
              },
            },
          });

          console.log(res);

          if (res.error) {
            console.log(res.error);
          } else {
            this.isPremium = true;
            this.authService.setUserPremium(true);
          }
          this.loading = false;
        },
      })
    );
  }
}
