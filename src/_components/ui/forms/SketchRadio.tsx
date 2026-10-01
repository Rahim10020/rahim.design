type SketchRadioProps = {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
};

export default function SketchRadio({
  name,
  value,
  label,
  defaultChecked,
}: SketchRadioProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer text-md lg:text-xl text-foreground">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="appearance-none shrink-0 w-5 h-5 rounded-full border-2 border-foreground bg-transparent grid place-content-center cursor-pointer checked:[&::before]:content-[''] checked:[&::before]:w-2.5 checked:[&::before]:h-2.5 checked:[&::before]:rounded-full checked:[&::before]:bg-foreground"
      />
      <span>{label}</span>
    </label>
  );
}
