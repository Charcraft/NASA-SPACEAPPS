import type { PuntoSerieOSDR } from "@/types";

interface TrendChartProps {
  serie: PuntoSerieOSDR[];
  rangoMin: number | null;
  rangoMax: number | null;
  activeTimepoint?: string;
}

export function TrendChart({
  serie,
  rangoMax,
  activeTimepoint = "R+1",
}: TrendChartProps) {
  const validos = serie.filter((p) => p.valor !== null) as {
    timepoint: string;
    valor: number;
  }[];

  if (validos.length === 0) return null;

  const valores = validos.map((v) => v.valor);
  const minVal = Math.min(...valores, rangoMax ? rangoMax * 0.7 : valores[0]);
  const maxVal = Math.max(...valores, rangoMax ? rangoMax * 1.08 : valores[0]);
  const span = Math.max(maxVal - minVal, 1);

  const width = 304;
  const height = 76;
  const padX = 8;
  const padY = 12;

  const coords = validos.map((pt, i) => {
    const x =
      padX +
      (validos.length > 1
        ? (i / (validos.length - 1)) * (width - padX * 2)
        : width / 2);
    const y =
      height - padY - ((pt.valor - minVal) / span) * (height - padY * 2);
    return { ...pt, x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  const pathD = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x} ${c.y}`)
    .join(" ");

  const yRefMax =
    rangoMax !== null
      ? Number(
          (
            height -
            padY -
            ((rangoMax - minVal) / span) * (height - padY * 2)
          ).toFixed(1)
        )
      : null;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-20 w-full overflow-visible"
      >
        {yRefMax !== null && yRefMax >= 0 && yRefMax <= height && (
          <line
            x1={padX}
            y1={yRefMax}
            x2={width - padX}
            y2={yRefMax}
            stroke="#1C2029"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}
        <path
          d={pathD}
          fill="none"
          stroke="#ECEFF4"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c) => {
          const isTarget = c.timepoint === activeTimepoint;
          return (
            <circle
              key={c.timepoint}
              cx={c.x}
              cy={c.y}
              r={isTarget ? 4 : 2.2}
              fill={isTarget ? "#ECEFF4" : "#484F5C"}
            />
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-[#484F5C]">
        <span>{coords[0]?.timepoint}</span>
        <span className="font-medium text-[#ECEFF4]">{activeTimepoint}</span>
        <span>{coords[coords.length - 1]?.timepoint}</span>
      </div>
    </div>
  );
}
