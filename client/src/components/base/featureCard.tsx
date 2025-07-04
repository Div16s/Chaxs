import React from "react";
import { Card } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm border border-border bg-background transition-all hover:shadow-md hover:border-accent/30">
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-medium tracking-tight text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}