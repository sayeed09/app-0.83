export interface PrimeUserDetails {
  acceptsMarketing: string;
  dateOfBirth: string;
  email?: string;
  firstName: string;
  gender: string;
  lastName: string;
  phone: string;
  identifierHash: string;
  identifier_hash?: string;
}

export enum PrimeMemberShipType {
  Prime = 'prime',
  FreeTrial = 'free_trial',
  FreeTrialExpired = 'free_trial_expired',
  FreeTrialEligible = 'free_trial_eligible',
  PrimeMembershipExpired = 'expired',
  NeverPrime = 'never_prime',
}

export interface ChatWootUser {
  identifier?: string;
  name?: string;
  avatar_url: string;
  email?: string;
  identityHash?: string;
  phone?: string;
  identifier_hash?: string;
}
