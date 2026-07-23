"use client";

import AccountLayout from "@/components/account/AccountLayout";
import ProfileInformation from "@/components/account/ProfileInformation";

export default function ProfilePage() {
  return (
    <AccountLayout
      title="Profile"
      description="Manage your personal information and House Eleven account."
    >
      <ProfileInformation />
    </AccountLayout>
  );
}