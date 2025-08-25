import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20 pb-12 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileX className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h1>

          <p className="text-muted-foreground mb-8">
            We couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or doesn&apos;t exist.
          </p>

          <div className="space-y-4">
            <Link href="/">
              <Button className="btn-primary-gradient px-8 py-3 font-medium w-full">
                Back to Home
              </Button>
            </Link>

            <Link href="/blog">
              <Button
                variant="outline"
                className="w-full bg-background/50 border-border hover:bg-accent/50"
              >
                Browse Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
