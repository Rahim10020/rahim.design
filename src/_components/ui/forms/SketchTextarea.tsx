type SketchTextareaProps = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export default function SketchTextarea({
  id,
  label,
  placeholder,
  required,
}: SketchTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-md lg:text-xl text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        rows={9}
        className="w-full bg-transparent border-2 border-foreground rounded-none p-6 text-md lg:text-xl leading-relaxed placeholder:text-foreground/60 focus:outline-none min-h-[280px] resize-y"
      />
    </div>
  );
}
