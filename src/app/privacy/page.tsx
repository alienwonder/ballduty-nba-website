import type { Metadata } from "next";
import AppPolicyList from "@/components/AppPolicyList";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policies for BallDuty's apps.",
};

export default function PrivacyListPage() {
  return (
    <AppPolicyList
      title="Privacy Policy"
      nbaHref="/privacy/nba"
      wc26Href="https://wc26.ballduty.com/privacy"
    />
  );
}
