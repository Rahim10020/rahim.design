type SketchFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  required?: boolean;
};

export default function SketchField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required,
}: SketchFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-lg text-foreground">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full bg-transparent border-2 border-foreground/40 rounded-none px-4 py-2 text-md placeholder:text-foreground/60 focus:outline-none focus-visible:outline-3 focus-visible:outline-primary-alt"
      />
    </div>
  );
}
