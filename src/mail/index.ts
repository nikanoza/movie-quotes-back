import { Edge } from "edge.js";
import path, { join } from "path";
import gmailTransport from "./gmail";

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const send = (to: string, subject: string, html: any) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };

  return gmailTransport.sendMail(options);
};

export const sendEmailConfirmation = async (
  to: string,
  hash: string,
  name: string,
  backLink: string
) => {
  const html = edge.renderSync("confirm-email", {
    link: `${backLink}?hash=${hash}`,
    name,
  });
  return send(to, "Email Confirmation", html);
};

export const sendPasswordRecovery = async (
  to: string,
  hash: string,
  name: string,
  backLink: string
) => {
  const html = edge.renderSync("password-recovery", {
    link: `${backLink}?hash=${hash}`,
    name,
  });

  return send(to, "Password Reset", html);
};
