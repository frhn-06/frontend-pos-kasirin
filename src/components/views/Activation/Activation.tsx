import { Button, Link } from '@heroui/react';
import Image from 'next/image';

const Activation = (props: {status: "success" | "failed"}) => {
    const {
      status
    } = props;

    return (
        <>
          <div className='w-1/2'>
            {status === "success" ? (
              <>
                <Image src="/auth/success.png" alt='failed' width={1080} height={1080} className='w-full' />
                <h1 className='text-blue-500 text-center text-xl mt-6 font-semibold'>
                  Aktivasi akun berhasil
                </h1>
              </>
            ) : (
              <>
                <Image src="/auth/failed.png" alt='failed' width={1080} height={1080} className='w-full' />
                <h1 className='text-blue-500 text-center text-xl mt-6 font-semibold'>
                  Aktivasi akun gagal
                </h1>
              </>
            )}
          </div>
        
          {status === "success" && (
            <Button as={Link} href='/dashboard' className='bg-yellow-500 text-white fixed bottom-2 right-2'>
              Dashboard
            </Button>
          )}
        </>
    )
}

export default Activation;