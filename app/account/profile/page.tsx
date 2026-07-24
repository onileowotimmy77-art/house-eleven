"use client";

import AccountLayout from "@/src/features/account/AccountLayout";
import ProfileInformation from "@/src/features/account/ProfileInformation";

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