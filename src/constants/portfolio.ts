import type { UIDict } from '../i18n/ui';

type TranslationKey = keyof UIDict;

export interface PortfolioLink {
  href: string;
  labelKey: TranslationKey;
}

export interface PortfolioProject {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  descriptionKey: TranslationKey;
  durationKey: TranslationKey;
  logo: string;
  cardImage: string;
  images: string[];
  stack: string[];
  link?: PortfolioLink;
}

const imagePath = (id: string, file: string) =>
  `/images/portfolio/${id}/${file}`;

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'ignis',
    titleKey: 'portfolio.ignis.title',
    subtitleKey: 'portfolio.ignis.subtitle',
    descriptionKey: 'portfolio.ignis.description',
    durationKey: 'portfolio.ignis.duration',
    logo: imagePath('ignis', 'ignis-logo.webp'),
    cardImage: imagePath('ignis', 'ignis-cover2.png'),
    images: [
      imagePath('ignis', 'ignis-cover2.png'),
      imagePath('ignis', 'agnis-alert-details.webp'),
      imagePath('ignis', 'ignis-alert.webp'),
    ],
    stack: ['SwiftUI', 'Jetpack Compose', 'Kotlin', 'Swift'],
    link: {
      href: 'https://ignis112.si/',
      labelKey: 'portfolio.visitWebsite',
    },
  },
  {
    id: 'gdt',
    titleKey: 'portfolio.gdt.title',
    subtitleKey: 'portfolio.gdt.subtitle',
    descriptionKey: 'portfolio.gdt.description',
    durationKey: 'portfolio.gdt.duration',
    logo: imagePath('gdt', 'WorkSafe-Guardian-logo.jpeg'),
    cardImage: imagePath('gdt', 'wsg-cover.png'),
    images: [
      imagePath('gdt', 'wsg-cover.png'),
      imagePath('gdt', 'wsg-1.png'),
      imagePath('gdt', 'wsg.png'),
    ],
    stack: [
      'Swift',
      'Objective-C',
      'Geolocation',
      'Geofencing',
      'SSO',
      'Bluetooth',
    ],
    link: {
      href: 'https://worksafeguardian.com.au/',
      labelKey: 'portfolio.visitWebsite',
    },
  },
  {
    id: 'dhimahi-flutter',
    titleKey: 'portfolio.dhimahi.title',
    subtitleKey: 'portfolio.dhimahi.subtitle',
    descriptionKey: 'portfolio.dhimahi.description',
    durationKey: 'portfolio.dhimahi.duration',
    logo: imagePath('dhimahi-flutter', 'logo-mini-cp.svg'),
    cardImage: imagePath('dhimahi-flutter', 'cp_cover.png'),
    images: [
      imagePath('dhimahi-flutter', 'cp_cover.png'),
      imagePath('dhimahi-flutter', 'cp-1.png'),
      imagePath('dhimahi-flutter', 'cp-2.png'),
    ],
    stack: [
      'Flutter',
      'Dart',
      'Swift',
      'Java',
      'Matrix chat',
      'iOS',
      'Android',
      'JavaScript',
      'HTML',
      'CSS',
    ],
    link: {
      href: 'https://www.churchpool.com/en/',
      labelKey: 'portfolio.visitWebsite',
    },
  },
  {
    id: 'flexPark-app',
    titleKey: 'portfolio.noctocode.title',
    subtitleKey: 'portfolio.noctocode.subtitle',
    descriptionKey: 'portfolio.noctocode.description',
    durationKey: 'portfolio.noctocode.duration',
    logo: imagePath('noctocode-apps', 'flexPark-logo.svg'),
    cardImage: imagePath('noctocode-apps', 'flexPark-cover.png'),
    images: [
      imagePath('noctocode-apps', 'flexPark-cover.png'),
      imagePath('noctocode-apps', 'flexPark-3.png'),
      imagePath('noctocode-apps', 'flexPark-2.png'),
    ],
    stack: ['Swift', 'SwiftUI', 'Objective-C', 'Kotlin', 'Flutter'],
    link: {
      href: 'https://flexpark.org/',
      labelKey: 'portfolio.visitWebsite',
    },
  },

  {
    id: 'limitlex',
    titleKey: 'portfolio.limitlex.title',
    subtitleKey: 'portfolio.limitlex.subtitle',
    descriptionKey: 'portfolio.limitlex.description',
    durationKey: 'portfolio.limitlex.duration',
    logo: imagePath('limitlex', 'limitlex-logo.png'),
    cardImage: imagePath('limitlex', 'limitlex-cover.png'),
    images: [
      imagePath('limitlex', 'limitlex-cover.png'),
      imagePath('limitlex', 'limitlex-graph.png'),
      imagePath('limitlex', 'limitlex-sign.png'),
    ],
    stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Angular',
      'V3CSS',
      'PHP',
      'Cordova',
      'Chart.js',
    ],
    link: {
      href: 'https://limitlex.com/',
      labelKey: 'portfolio.visitWebsite',
    },
  },
  {
    id: 'tomazinmasatrip.eu',
    titleKey: 'portfolio.tomazinmasatrip.eu.title',
    subtitleKey: 'portfolio.tomazinmasatrip.eu.subtitle',
    descriptionKey: 'portfolio.tomazinmasatrip.eu.description',
    durationKey: 'portfolio.tomazinmasatrip.eu.duration',
    logo: imagePath('tomazinmasatrip', 'logo_tmsp.png'),
    cardImage: imagePath('tomazinmasatrip', 'tsmp.png'),
    images: [
      imagePath('tomazinmasatrip', 'tsmp.png'),
      imagePath('tomazinmasatrip', 'tsmp-1.png'),
      imagePath('tomazinmasatrip', 'tsmp-2.png'),
    ],
    stack: ['Web', 'TypeScript', 'HTML', 'CSS', 'Astro', 'Tailwind CSS'],
    link: {
      href: 'https://tomazinmasatrip.eu',
      labelKey: 'portfolio.visitWebsite',
    },
  },
  {
    id: 'belokranjski-izdelki',
    titleKey: 'portfolio.belokranjski.title',
    subtitleKey: 'portfolio.belokranjski.subtitle',
    descriptionKey: 'portfolio.belokranjski.description',
    durationKey: 'portfolio.belokranjski.duration',
    logo: imagePath('belokranjski-izdelki', 'bk-izdelki-logo.png'),
    cardImage: imagePath('belokranjski-izdelki', 'bk-izdelki-2.png'),
    images: [
      imagePath('belokranjski-izdelki', 'bk-izdelki-1.png'),
      imagePath('belokranjski-izdelki', 'bk-izdelki-2.png'),
      imagePath('belokranjski-izdelki', 'bk-izdelki-3.png'),
    ],
    stack: [
      'E-commerce',
      'Web',
      'Wordpress',
      'WooCommerce',
      'JavaScript',
      'HTML',
      'CSS',
    ],
    link: {
      href: 'https://belokranjski-izdelki.si',
      labelKey: 'portfolio.visitWebsite',
    },
  },
];
