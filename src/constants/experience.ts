import type { UIDict } from '../i18n/ui';

type TranslationKey = keyof UIDict;

export type ExperienceGroupId = 'mobile' | 'web' | 'leadership';

/**
 * One role/org block. Use either `bulletKeys`, a single `bodyKey` paragraph,
 * or `introKey` plus `taskKeys` (ŠKIS-style). Period/year keys are omitted by design.
 */
export interface ExperienceEntry {
  roleKey: TranslationKey;
  companyKey?: TranslationKey;
  bulletKeys?: readonly TranslationKey[];
  bodyKey?: TranslationKey;
  introKey?: TranslationKey;
  taskKeys?: readonly TranslationKey[];
}

export interface ExperienceGroup {
  id: ExperienceGroupId;
  /** Stable fragment for deep links, e.g. `#experience-mobile`. */
  anchorId: `experience-${ExperienceGroupId}`;
  titleKey: TranslationKey;
  introKey: TranslationKey | null;
  entries: readonly ExperienceEntry[];
}

export const experienceGroups: readonly ExperienceGroup[] = [
  {
    id: 'mobile',
    anchorId: 'experience-mobile',
    titleKey: 'experience.groups.mobile',
    introKey: 'experience.groups.mobile.intro',
    entries: [
      {
        roleKey: 'experience.bplanet.title',
        companyKey: 'experience.bplanet.company',
        bulletKeys: [
          'experience.bplanet.description1',
          'experience.bplanet.description2',
          'experience.bplanet.description3',
        ],
      },
      {
        roleKey: 'experience.mobileDeveloper',
        companyKey: 'experience.noctocode.company',
        bulletKeys: [
          'experience.noctocode.description1',
          'experience.noctocode.description2',
          'experience.noctocode.description3',
          'experience.noctocode.description4',
        ],
      },
      {
        roleKey: 'experience.leadIOSDeveloper',
        companyKey: 'experience.gdt.company',
        bulletKeys: [
          'experience.gdt.description1',
          'experience.gdt.description2',
          'experience.gdt.description3',
          'experience.gdt.description4',
        ],
      },
      {
        roleKey: 'experience.softwareDeveloper',
        companyKey: 'experience.dhimahi.company',
        bulletKeys: [
          'experience.dhimahi.description1',
          'experience.dhimahi.description2',
          'experience.dhimahi.description3',
          'experience.dhimahi.description4',
        ],
      },
    ],
  },
  {
    id: 'web',
    anchorId: 'experience-web',
    titleKey: 'experience.groups.web',
    introKey: 'experience.groups.web.intro',
    entries: [
      {
        roleKey: 'experience.webDeveloper',
        companyKey: 'experience.limitlex.company',
        bulletKeys: [
          // 'experience.limitlex.description1',
          'experience.limitlex.description2',
          'experience.limitlex.description3',
          'experience.limitlex.description4',
        ],
      },
      {
        roleKey: 'experience.belokranjski.role',
        companyKey: 'experience.belokranjski.company',
        bulletKeys: [
          'experience.belokranjski.description1',
          'experience.belokranjski.description2',
          'experience.belokranjski.description3',
          'experience.belokranjski.description4',
        ],
      },
    ],
  },
  {
    id: 'leadership',
    anchorId: 'experience-leadership',
    titleKey: 'experience.groups.leadership',
    introKey: 'experience.groups.leadership.intro',
    entries: [
      {
        roleKey: 'experience.presidenPGD',
        bodyKey: 'experience.pgd.description',
      },
      {
        roleKey: 'experience.eventOrganiser',
        bodyKey: 'experience.skisova.description',
      },
      {
        roleKey: 'experience.headTechnical',
        bodyKey: 'experience.headTechnical.description',
      },
      {
        roleKey: 'experience.skis.supervisoryBoard',
        introKey: 'experience.skis.supervisoryBoard.intro',
        taskKeys: [
          'experience.skis.supervisoryBoard.task1',
          'experience.skis.supervisoryBoard.task2',
          'experience.skis.supervisoryBoard.task3',
          'experience.skis.supervisoryBoard.task4',
        ],
      },
    ],
  },
];
