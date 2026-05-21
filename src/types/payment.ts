export type PaymentInitiateType = "order_payment";

export interface PaymentInitiatePayload {
  type: PaymentInitiateType;
  source_id: string;
}

export interface PaymentInitiateResponseData {
  message: string;
  authorization_url: string;
  reference: string;
}

export interface PaymentVerifyResponseData {
  // Backend-specific fields can vary; we keep this minimal.
  verified?: boolean;
  reference?: string;
  status?: string;
  message?: string;
  source_id?: string;
  type?: PaymentInitiateType;
}
