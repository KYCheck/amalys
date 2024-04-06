"use client";

import { Suspense } from 'react'
import State from '../../components/state';

export default function Page() {
    return (
        <Suspense>
          <State />
        </Suspense>
      )
}