export interface UserWithSubmission {
  _id: string;
  submissionId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  check?: string;
  total: number;
  paid_amount: number;
  isPaid: boolean;
  isPresent?: boolean;
  comment?: string;
  [key: string]: any;
}

export interface SubmissionWithUsers {
  _id: string;
  submissionId: string;
  users: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    isPresent?: boolean;
    [key: string]: any;
  }>;
  check?: string;
  total: number;
  paid_amount: number;
  isPaid: boolean;
  comment?: string;
  [key: string]: any;
}

export interface GroupedSubmission {
  _id: string;
  submissionId: string;
  users: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    isPresent?: boolean;
    [key: string]: any;
  }>;
  check?: string;
  total: number;
  paid_amount: number;
  isPaid: boolean;
  comment?: string;
  [key: string]: any;
}
