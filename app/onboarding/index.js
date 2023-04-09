import React from 'react';

import OnboardingHeader from './OnboardingHeader';
import { Stack } from 'expo-router';
import OnboardingForm from './OnboardingForm';

const Onboarding = ({ submitHandler }) => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <OnboardingHeader />
      <OnboardingForm submitHandler={submitHandler} />
    </>
  );
};

export default Onboarding;
