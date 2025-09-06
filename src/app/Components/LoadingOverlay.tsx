'use client';

import { Transition } from '@headlessui/react';

type Props = {
  show: boolean;
};

export default function LoadingOverlay({ show }: Props) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-2 text-sm text-blue-700 font-medium">Loading…</p>
        </div>
      </div>
    </Transition>
  );
}
