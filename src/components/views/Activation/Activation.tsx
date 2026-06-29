import { Button, Link } from '@heroui/react';
import Image from 'next/image';

const Activation = (props: {status: "success" | "failed"}) => {
    const {
      status
    } = props;

    return (
        <>
          <div className='p-4'>
            {status === "success" ? (
              <>
                <div className='w-1/2 mx-auto'>
                  <Image src="/auth/success.png" alt='failed' width={1080} height={1080} className='w-full' />
                </div>
                <h1 className='text-blue-500 text-center text-xl mt-6 font-semibold'>
                  Aktivasi akun berhasil
                </h1>
              </>
            ) : (
              <>
                <div className='w-1/2 mx-auto'>
                  <Image src="/auth/failed.png" alt='failed' width={1080} height={1080} className='w-full' />
                </div>
                <h1 className='text-blue-500 text-center text-xl mt-6 font-semibold'>
                  Aktivasi akun gagal
                </h1>
              </>
            )}
          </div>
        
          {status === "success" && (
            <Button as={Link} href='/auth/login' className='bg-yellow-500 text-white fixed bottom-2 right-2'>
              Login
            </Button>
          )}
        </>
    )
}

export default Activation;