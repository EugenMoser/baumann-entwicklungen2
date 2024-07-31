'use client';
import { MouseEventHandler } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/router';

import Icon from '@mdi/react';

import { Product } from '../common/types';
import { sections } from '../constants/sections';

export function useCreateSection(
  router: AppRouterInstance
): JSX.Element[] {
  function onClickHandler(
    category: string
  ): MouseEventHandler<HTMLButtonElement> | undefined {
    router.push(`/products/${category}`);

    //fix issus "localStorage is not defined"
    if (typeof window !== 'undefined') {
      sessionStorage && sessionStorage.removeItem('TILO_scrollPosition');
    }
    return;
  }
  const returnSection = sections.map((section, index) => {
    return (
      <li key={index}>
        <button
          onClick={() => onClickHandler(section.category)}
          className='flex items-center justify-center w-full h-24 bg-blue-500 border-none rounded-lg cursor-pointer hover:focus:bg-yellow-300 gap-4'
        >
          <Icon
            path={section.icon}
            size={1.5}
          />
          {section.name}
        </button>
      </li>
    );
  });
  return returnSection;
}
