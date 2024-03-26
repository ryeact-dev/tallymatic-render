import { Card, CardContent, CardHeader } from '@/common/ui/card';

export default function CardContainer({
  headerClass,
  contentClass,
  className,
  cardHeader,
  children,
}) {
  return (
    <Card className={`mx-4 max-w-[calc(100%-2rem)] ${className}`}>
      <CardHeader className={headerClass}>{cardHeader}</CardHeader>
      {cardHeader && <div className='border-b mb-4' />}
      <CardContent className={contentClass}>{children}</CardContent>
    </Card>
  );
}
