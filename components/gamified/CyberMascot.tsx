import type { ReactNode } from "react";

type CyberMascotProps = {
  className?: string;
  mood?: "cheer" | "focus" | "celebrate";
  size?: "sm" | "md" | "lg";
};

type MascotCoachProps = {
  children: ReactNode;
  eyebrow?: string;
  mascotMood?: CyberMascotProps["mood"];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CyberMascot({
  className,
  mood = "cheer",
  size = "md"
}: CyberMascotProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "cyber-mascot",
        `cyber-mascot-${size}`,
        `cyber-mascot-${mood}`,
        className
      )}
    >
      <div className="cyber-mascot-shadow" />
      <div className="cyber-mascot-body">
        <div className="cyber-mascot-antenna" />
        <div className="cyber-mascot-face">
          <span className="cyber-mascot-eye cyber-mascot-eye-left" />
          <span className="cyber-mascot-eye cyber-mascot-eye-right" />
          <span className="cyber-mascot-smile" />
        </div>
        <div className="cyber-mascot-badge">C</div>
        <div className="cyber-mascot-arm cyber-mascot-arm-left" />
        <div className="cyber-mascot-arm cyber-mascot-arm-right" />
        <div className="cyber-mascot-foot cyber-mascot-foot-left" />
        <div className="cyber-mascot-foot cyber-mascot-foot-right" />
      </div>
    </div>
  );
}

export function MascotCoach({
  children,
  eyebrow = "Coach Cyber",
  mascotMood = "cheer"
}: MascotCoachProps) {
  return (
    <aside className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
      <CyberMascot mood={mascotMood} size="sm" />
      <div className="min-w-0">
        <p className="text-xs font-black uppercase text-tertiary">{eyebrow}</p>
        <p className="mt-1 text-sm font-extrabold leading-6 text-on-surface sm:text-base">
          {children}
        </p>
      </div>
    </aside>
  );
}
