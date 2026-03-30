import { Button } from "@/components/ui/Button";
import { ShareIcon } from "@/components/ui/Icons";

export function InsightHeroSection() {
  return (
    <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1">
          <span className="size-2 rounded-full bg-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Live Analysis
          </span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl md:leading-none">
          Your Music DNA
        </h1>
        <p className="text-base leading-6 text-muted">
          A deep dive into your sonic architecture. We&apos;ve analyzed 2,482
          streams to map your unique listening profile for June 2024.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">
          <ShareIcon className="size-4" />
          Share DNA
        </Button>
        <Button variant="secondary">Export Data</Button>
      </div>
    </section>
  );
}
