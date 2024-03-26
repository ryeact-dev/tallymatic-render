import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import LoginForm from './login-form/LoginForm';

export default function Login() {
  return (
    <Card className='w-[350px]'>
      <CardHeader className='items-center'>
        <CardTitle className='text-2xl font-bold text-primary -mb-2'>
          tallymatic
        </CardTitle>
        <CardDescription className='text-gray-800'>
          a rank-base tabulation system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
