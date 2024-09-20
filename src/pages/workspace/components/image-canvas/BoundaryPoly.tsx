import { Line } from "react-konva";

export interface BoundaryPolyVertex {
  x: number;
  y: number;
}

export type BoundaryPolyType = BoundaryPolyVertex[];

interface BoundaryBoxProps {
  poly: BoundaryPolyType;
}

export function BoundaryPoly({ poly }: BoundaryBoxProps) {
  const flattenedPoly = poly.flatMap((vertex) => Object.values(vertex));

  return <Line points={flattenedPoly} stroke="green" strokeWidth={1} closed />;
}
