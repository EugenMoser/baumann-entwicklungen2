'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import SectionButton from '../components/Buttons/sectionButton';
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
        <SectionButton
          section={section}
          router={router}
        />
      </li>
    );
  });
  return returnSection;
}
