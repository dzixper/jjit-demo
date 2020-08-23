export class BUNDLES {
  basicBundlePL: Array<object> = [
    {text: 'Ogłoszenie na 30 dni', active: true},
    {text: 'Ogłoszenie w prasówce technologicznej', active: true},
    {text: 'Brak Customer Care', active: false},
    {text: 'Bez odświeżeń', active: false},
    {text: 'Brak promocji w Social Media', active: false},
    {text: 'Brak indywidualnego copy', active: false},
    {text: 'Brak Social Boost - płatna kampania marketingowa w social media na budżecie klienta', active: false}
  ];

  premiumBundlePL: Array<object> = [
    {text: 'Ogłoszenie na 30 dni', active: true},
    {text: 'Ogłoszenie w prasówce technologicznej', active: true},
    {text: 'Dedykowany opiekun Customer Care', active: true},
    {text: '1 automatyczne odświeżenie', active: true},
    {text: 'Brak promocji w Social Media', active: false},
    {text: 'Brak indywidualnego copy', active: false},
    {text: 'Brak Social Boost - płatna kampania marketingowa w social media na budżecie klienta', active: false}
  ];

  businessBundlePL: Array<object> = [
    {text: 'Ogłoszenie na 30 dni', active: true},
    {text: 'Ogłoszenie w prasówce technologicznej', active: true},
    {text: 'Dedykowany opiekun Customer Care', active: true},
    {text: '2 automatyczne odświeżenia', active: true},
    {text: 'Indywidualna promocja w Social Media', active: true},
    {text: 'Indywidualne copy ogłoszenia + audyt', active: true},
    {text: 'Możliwy Social Boost - płatna kampania marketingowa w social media na budżecie klienta', active: true}
  ];

  basicBundleEN: Array<object> = [
    {text: 'Offer for 30 days', active: true},
    {text: 'Job ad in technological summaries', active: true},
    {text: 'No Individual Customer Care', active: false},
    {text: 'No bump ups', active: false},
    {text: 'No promotion in Social Media', active: false},
    {text: 'No individual copy', active: false},
    {text: 'No Social boost - paid job ads promotion in social media with budget provided by the client', active: false}
  ];

  premiumBundleEN: Array<object> = [
    {text: 'Offer for 30 days', active: true},
    {text: 'Job ad in technological summaries', active: true},
    {text: 'Invividual Customer Care', active: true},
    {text: '1 automatic bump-up', active: true},
    {text: 'No promotion in Social Media', active: false},
    {text: 'No individual copy', active: false},
    {text: 'No Social boost - paid job ads promotion in social media with budget provided by the client', active: false}
  ];

  businessBundleEN: Array<object> = [
    {text: 'Offer for 30 days', active: true},
    {text: 'Job ad in technological summaries', active: true},
    {text: 'Individual Customer Care', active: true},
    {text: '2 automatic bump-up', active: true},
    {text: 'Individual promotion in Social Media', active: true},
    {text: 'Individual job ad copy + audit', active: true},
    {text: 'Optional Social boost - - paid job ads promotion in social media with budget provided by the client', active: true}
  ];

  passBundle(bundle: string, lang: string): Array<object> {
    switch (lang) {
      case 'PL':
        switch (bundle) {
          case 'basic':
            return this.basicBundlePL;
          case 'premium':
            return this.premiumBundlePL;
          case 'business':
            return this.businessBundlePL;
        }
      case 'EN':
        switch (bundle) {
          case 'basic':
            return this.basicBundleEN;
          case 'premium':
            return this.premiumBundleEN;
          case 'business':
            return this.businessBundleEN;
        }
    }
  }
}
