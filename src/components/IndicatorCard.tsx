import Link from "next/link";

interface IndicatorCardProps {
  label: string;
  value: string | number;
  unit: string;
  baselineText: string;
  href?: string;
  highlight?: boolean;
}

export function IndicatorCard({
  label,
  value,
  unit,
  baselineText,
  href,
  highlight = false,
}: IndicatorCardProps) {
  const content = (
    <div className="group border-b border-[#181B22] py-5 transition-colors first:pt-0 last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#7D8594] group-hover:text-[#ECEFF4] transition-colors">
          {label}
        </span>
        {highlight && (
          <span className="h-1.5 w-1.5 rounded-full bg-[#ECEFF4]" />
        )}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-[38px] font-light leading-none tracking-[-0.03em] text-[#ECEFF4]">
            {value}
          </span>
          <span className="text-sm text-[#484F5C]">{unit}</span>
        </div>
        <span className="text-xs text-[#7D8594]">{baselineText}</span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }
  return content;
}
