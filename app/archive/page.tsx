import {
  ArchiveThreshold,
  ArchivePrologue,
  ArchiveTimeline,
} from "@/components/archive";

export default function ArchivePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ArchiveThreshold />

      <ArchivePrologue />

      <ArchiveTimeline />
    </main>
  );
}