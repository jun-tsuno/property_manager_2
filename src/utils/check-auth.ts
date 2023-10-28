import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export const checkAuthentication = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return true;
  }
  return false;
};
