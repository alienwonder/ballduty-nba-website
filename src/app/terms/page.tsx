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
      nbaHref="/terms/nba"
      wc26Href="https://wc26.ballduty.com/terms"
    />
  );
}
