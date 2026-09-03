export default function PieChart() {
  return (
    <div>
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        {/* Pie chart avec conic-gradient */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(
              from 0deg,
              #2a2a2a 0deg 220deg,   /* Coder (plus grand) */
              #b0b0b0 220deg 360deg  /* Designer */
            )`,
          }}
        />

        {/* Labels */}
        <span className="absolute left-[08%] top-[40%] text-background text-xl md:text-2xl font-medium select-none">
          Designer
        </span>
        <span className="absolute right-[16%] top-[42%] text-background text-xl md:text-2xl font-medium select-none">
          Coder
        </span>
      </div>
    </div>
  );
}
