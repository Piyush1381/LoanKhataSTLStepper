import {
  User,
  MapPin,
  FileText,
  CreditCard,
  Check,
} from "lucide-react";

import PersonalStep from "./steps/PersonalStep";
import AddressStep from "./steps/AddressStep.tsx";

import {
  savePersonal,
  saveAddress,
} from "./onboarding.api";

export const onboardingSteps = [
  {
    id: "personal",
    title: "Personal Information",
    icon: User,
    description: "Provide your personal details",
    component: PersonalStep,
    submit: savePersonal,
    footer: {
      primaryLabel: "Continue",
    },
  },

  {
    id: "address",
    title: "Address",
    icon: MapPin,
description: "Provide your address details",
    component: AddressStep,
    submit: saveAddress,
    footer: {
      primaryLabel: "Proceed",
    },
  },

  {
    id: "documents",
    title: "Documents",
    description:" Upload necessary documents",
    icon: FileText      ,
    component: PersonalStep,
    footer: {
      primaryLabel: "Verify",
    },
  },

  {
    id: "payment",
    title: "Payment",
    description:"",
    icon: CreditCard    ,
    component: PersonalStep,
      footer: {
      primaryLabel: "Submit",
    },
  },

  // Step 5
  // Step 6
  // Step 7
  // Step 8
  // Step 9
  // Step 10
  // Step 11
  // Step 12
  // Step 13

  {
    id: "review",
    title: "Review",
    description: "Review your information",
    icon: Check,

    component: PersonalStep,
  },
];
