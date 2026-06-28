import Image from 'next/image';

const Activation = (props: {status: "success" | "failed"}) => {
    const {
      status
    } = props;

    return (
        <div className='w-64'>
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
    )
}

export default Activation;