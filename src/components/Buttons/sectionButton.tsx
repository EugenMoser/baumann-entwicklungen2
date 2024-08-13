import { MouseEventHandler } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import Icon from '@mdi/react';

interface SectionButtonProps {
  section: {
    category: string;
    name: string;
    icon: string;
  };
  router: AppRouterInstance;
}

function SectionButton({
  section,
  router,
}: SectionButtonProps): JSX.Element {
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
  return (
    <button
      onClick={() => onClickHandler(section.category)}
      className='flex items-center justify-center w-full h-24 bg-blue-500 border-none rounded-lg cursor-pointer gap-4 hover:bg-yellow-300'
    >
      <Icon
        path={section.icon}
        size={1.5}
      />
      {section.name}
    </button>
  );
}

export default SectionButton;
