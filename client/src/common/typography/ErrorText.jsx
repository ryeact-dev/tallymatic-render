import { cn } from '@/lib/utils/shadcn';

function ErrorText({ styleClass, children }) {
  return (
    <p
      className={cn(
        'pl-1 font-normal text-xs text-secondary tracking-wide',
        styleClass
      )}
    >
      {children}
    </p>
  );
}
export default ErrorText;
