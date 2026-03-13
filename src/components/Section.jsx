import useReveal from "../hooks/useReveal";

export default function Section({ children, delay = 0, id }) {
  const [ref, isVisible] = useReveal(0.08);

  return (
    <section
      ref={ref}
      id={id}
      className="reveal-enter"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(36px)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </section>
  );
}
