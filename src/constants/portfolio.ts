import type { ImageMetadata } from 'astro';
import type { UIDict } from '../i18n/ui';
import { portfolioImage } from './portfolio-assets';

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
  logo: ImageMetadata;
  cardImage: ImageMetadata;
  images: ImageMetadata[];
  stack: string[];
  link?: PortfolioLink;
}

const asset = (id: string, file: string) => portfolioImage(`${id}/${file}`);

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'ignis',
    titleKey: 'portfolio.ignis.title',
    subtitleKey: 'portfolio.ignis.subtitle',
    descriptionKey: 'portfolio.ignis.description',
    durationKey: 'portfolio.ignis.duration',
    logo: asset('ignis', 'ignis-logo.webp'),
    cardImage: asset('ignis', 'ignis-cover2.png'),
    images: [
      asset('ignis', 'ignis-cover2.png'),
      asset('ignis', 'agnis-alert-details.webp'),
      asset('ignis', 'ignis-alert.webp'),
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
    logo: asset('gdt', 'WorkSafe-Guardian-logo.jpeg'),
    cardImage: asset('gdt', 'wsg-cover.png'),
    images: [
      asset('gdt', 'wsg-cover.png'),
      asset('gdt', 'wsg-1.png'),
      asset('gdt', 'wsg.png'),
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
    logo: asset('dhimahi-flutter', 'logo-mini-cp.svg'),
    cardImage: asset('dhimahi-flutter', 'cp_cover.png'),
    images: [
      asset('dhimahi-flutter', 'cp_cover.png'),
      asset('dhimahi-flutter', 'cp-1.png'),
      asset('dhimahi-flutter', 'cp-2.png'),
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
    logo: asset('noctocode-apps', 'flexPark-logo.svg'),
    cardImage: asset('noctocode-apps', 'flexPark-cover.png'),
    images: [
      asset('noctocode-apps', 'flexPark-cover.png'),
      asset('noctocode-apps', 'flexPark-3.png'),
      asset('noctocode-apps', 'flexPark-2.png'),
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
    logo: asset('limitlex', 'limitlex-logo.png'),
    cardImage: asset('limitlex', 'limitlex-cover.png'),
    images: [
      asset('limitlex', 'limitlex-cover.png'),
      asset('limitlex', 'limitlex-graph.png'),
      asset('limitlex', 'limitlex-sign.png'),
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
    id: 'belokranjski-izdelki',
    titleKey: 'portfolio.belokranjski.title',
    subtitleKey: 'portfolio.belokranjski.subtitle',
    descriptionKey: 'portfolio.belokranjski.description',
    durationKey: 'portfolio.belokranjski.duration',
    logo: asset('belokranjski-izdelki', 'bk-izdelki-logo.png'),
    cardImage: asset('belokranjski-izdelki', 'bk-izdelki-2.png'),
    images: [
      asset('belokranjski-izdelki', 'bk-izdelki-1.png'),
      asset('belokranjski-izdelki', 'bk-izdelki-2.png'),
      asset('belokranjski-izdelki', 'bk-izdelki-3.png'),
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
  {
    id: 'tomazinmasatrip.eu',
    titleKey: 'portfolio.tomazinmasatrip.eu.title',
    subtitleKey: 'portfolio.tomazinmasatrip.eu.subtitle',
    descriptionKey: 'portfolio.tomazinmasatrip.eu.description',
    durationKey: 'portfolio.tomazinmasatrip.eu.duration',
    logo: asset('tomazinmasatrip', 'logo_tmsp.png'),
    cardImage: asset('tomazinmasatrip', 'tsmp.png'),
    images: [
      asset('tomazinmasatrip', 'tsmp.png'),
      asset('tomazinmasatrip', 'tsmp-1.png'),
      asset('tomazinmasatrip', 'tsmp-2.png'),
    ],
    stack: ['Web', 'TypeScript', 'HTML', 'CSS', 'Astro', 'Tailwind CSS'],
    link: {
      href: 'https://tomazinmasatrip.eu',
      labelKey: 'portfolio.visitWebsite',
    },
  },
];
