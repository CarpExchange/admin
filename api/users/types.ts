

export type LoginPayload = {
  email: string;
  password: string;
}

export type DeleteUserPayload = {
  id: string;
  uid: string;
}

export type GetUserDetailsPayload = {
  id: string;
  uid: string;
}

export type UpdateVerificationStatusPayload = {
  id: string;
  email: string;
  verification_type: 'bvn' | 'nin';
  status: 'true' | 'false';
}

export type BlacklistUserPayload = {
  id: string;
  uid: string;
  blacklist: boolean;
};