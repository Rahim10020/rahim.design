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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-lg text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-transparent border-2 border-foreground/40 rounded-none p-6 text-md leading-relaxed placeholder:text-foreground/60 placeholder:max-w-sm focus:outline-none min-h-[100px] lg:min-h-[200px] resize-y"
      />
    </div>
  );
}
