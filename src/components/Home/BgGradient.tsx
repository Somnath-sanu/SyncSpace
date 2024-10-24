/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

export default function BgGradient({
  children,
  className,
  stars = 150,
}: {
  children: React.ReactNode;
  className?: string;
  stars?: number;
}) {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full">
          {[...Array(stars)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                opacity: Math.random() * 0.5 + 0.5,
                animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
