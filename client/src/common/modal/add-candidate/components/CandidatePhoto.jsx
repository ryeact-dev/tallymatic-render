import { useState } from 'react';
import { Icon } from '@iconify-icon/react';

export default function CandidatePhoto({ photoUrl, setPhotoUrl }) {
  const imgSrc = photoUrl ? import.meta.env.VITE_API_URL + photoUrl : '';

  const [base64Image, setBase64Image] = useState(imgSrc);

  function uploadPhoto(evt) {
    const file = evt.target.files[0];
    if (!file) return;

    setPhotoUrl(file);

    // Convert image to base64 string
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
  }

  return (
    <div className='flex-1 relative size-auto items-center space-y-1 border-dashed border border-primary/50 dark:border-foreground rounded-2xl p-2'>
      {base64Image ? (
        <img
          className='w-full h-72 object-cover rounded-lg object-center'
          src={base64Image}
          alt='candidatePhoto'
        />
      ) : (
        <div className='h-72 w-full flex items-center justify-center'>
          <Icon icon='line-md:image-twotone' width='100' height='100' />
        </div>
      )}
      <label className='absolute bottom-3 right-3 size-14 cursor-pointer rounded-full bg-primary opacity-85 p-2 text-white'>
        <input
          type='file'
          accept='image/jpeg, image/jpg, image/webp, image/png'
          multiple
          hidden
          onChange={uploadPhoto}
        />
        <p className='flex items-center justify-center'>
          <Icon icon='line-md:uploading-loop' width='36' height='36' />
        </p>
      </label>
    </div>
  );
}
