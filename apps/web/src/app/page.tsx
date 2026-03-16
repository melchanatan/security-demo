import { Button } from "@security-demo/ui/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl italic tracking-tight">
        Security Demo
      </h1>
      <p className="text-lg text-muted-foreground">
        A secure, type-safe todo application.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
        <Link href="/todos">
          <Button variant="outline">View Todos</Button>
        </Link>
      </div>
    </div>
  );
}
