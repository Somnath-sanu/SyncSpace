import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  feedback: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  feedback,
}) => (
  <div>
    <h1>Given Feedback, {fullName}!</h1>
    <h2>Email: {email}</h2>
    <h3>Feedback: {feedback}</h3>
  </div>
);
