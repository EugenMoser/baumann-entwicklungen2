'use client';
import {
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

import { strings } from '@/src/constants/strings';
import { useCreateSection } from '@/src/hooks/useCreateSection';

interface HomePageProps {}

function HomePage({}: HomePageProps): JSX.Element {
  const router: AppRouterInstance = useRouter();

  return (
    <>
      <h1 className='text-center text-4xl my-4'>
        {strings.companyWelcome}
      </h1>

      <p className='leading-6'>{strings.companyDescription}</p>

      <h3 className='flex justify-center text-3xl my-8 mb-5'>
        {strings.companyOurAreas}
      </h3>

      <ul className='flex flex-col items-center gap-8'>
        {useCreateSection(router)}
      </ul>
    </>
  );
}

export default HomePage;
