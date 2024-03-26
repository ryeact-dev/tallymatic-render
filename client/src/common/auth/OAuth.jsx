import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useUserStore } from '@/store';
import { useLoginUser } from '@/hooks/users';
import { app } from '@/lib/utils/firebase';
import { FcGoogle } from 'react-icons/fc';

export default function OAuth() {
  const setOnLoginSuccess = useUserStore((state) => state.setOnLoginSuccess);

  const googleAuthMutation = useLoginUser(setOnLoginSuccess, true);

  const onGoogleClickHandler = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    const googleUserData = {
      name: result.user.displayName,
      email: result.user.email,
      photo_url: result.user.photoURL,
    };

    googleAuthMutation.mutate(googleUserData);
  };

  return (
    <button
      onClick={onGoogleClickHandler}
      type='button'
      className='btn w-full !border-primary border-2 bg-primary/10 hover:bg-primary text-white text-base transition-all duration-300 ease-in flex items-center justify-center gap-2'
    >
      <FcGoogle size={22} /> Login with Google
    </button>
  );
}
