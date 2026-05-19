import PageHead from "@/components/commons/PageHead";

interface TypeProps {
  title: string;
  children: React.ReactNode;
}

const SuccessRegisterLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    return (
        <>
          <PageHead title={title} />

          <main>
            <div className="flex justify-center items-center min-h-screen">
              {children}
            </div>
          </main>
        </>
    )
}


export default SuccessRegisterLayout;