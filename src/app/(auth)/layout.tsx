import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <Image
          src="/logo.jpeg"
          alt="Deep Training For TOEIC"
          width={44}
          height={44}
          className="h-10 w-10 rounded-xl object-contain"
          priority
        />
        <span className="font-heading text-lg font-bold tracking-tight text-[var(--text)]">
          Deep Training For TOEIC
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
