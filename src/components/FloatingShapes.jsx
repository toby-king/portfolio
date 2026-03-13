import { PASTEL_GRADIENTS } from "../theme";

const SHAPES = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  size: 160 + Math.random() * 240,
  x: Math.random() * 100,
  y: 5 + Math.random() * 85,
  duration: 24 + Math.random() * 18,
  delay: Math.random() * -20,
  gradient: PASTEL_GRADIENTS[index % PASTEL_GRADIENTS.length],
}));

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {SHAPES.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full opacity-[0.04]"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.gradient,
            filter: "blur(80px)",
            animation: `float-blob ${shape.duration}s ease-in-out ${shape.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
