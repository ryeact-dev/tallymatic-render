import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';

export default function SelectContainer({
  className,
  placeholder,
  title,
  data,
  defaultData,
  ...rest
}) {
  return (
    <Select {...rest} defaultValue={defaultData.value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {data.map(({ name, value }, index) => (
            <SelectItem key={index} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
