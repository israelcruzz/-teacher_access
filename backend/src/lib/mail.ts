import { Resend } from "resend";
import { env } from "../env/env";

const resend = new Resend(env.RESEND_SECRET_KEY);

interface MailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export async function mail({ to, subject, html }: MailParams) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
    
  });
}
