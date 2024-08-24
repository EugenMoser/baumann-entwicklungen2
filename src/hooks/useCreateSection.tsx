'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import SectionCard from '../components/Cards/sectionCard';
import { sections } from '../constants/sections';

export function useCreateSection(
  router: AppRouterInstance
): JSX.Element[] {
  const returnSection = sections.map((section, index) => {
    return (
      <li
        key={index}
        className='border-none'
      >
        <SectionCard
          section={section}
          router={router}
        />
      </li>
    );
  });
  return returnSection;
}
