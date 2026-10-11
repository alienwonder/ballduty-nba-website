import type { Metadata } from "next";
import AppPolicyList from "@/components/AppPolicyList";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for BallDuty's apps.",
};

export default function TermsListPage() {
  return (
    <AppPolicyList
      title="Terms & Conditions"
      nextbucketHref="/terms/nextbucket"
      wc26Href="https://wc26.ballduty.com/terms"
    />
  );
}
