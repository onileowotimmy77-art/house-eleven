"use client";

import AccountLayout from "@/src/features/account/AccountLayout";
import ProfileInformation from "@/src/features/account/ProfileInformation";
import AccountAccess from "@/src/features/account/AccountAccess";

export default function ProfilePage() {
  return (
    <AccountLayout
      title="Profile"
      description="Manage your personal information and House Eleven account."
    >
      <AccountAccess />
      <ProfileInformation />
    </AccountLayout>
  );
}