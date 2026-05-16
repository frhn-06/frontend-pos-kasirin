import PageHead from "@/components/commons/PageHead";

interface TypeProps {
  title: string;
  children: React.ReactNode;
}

const ActivationLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    return (
        <>
          <PageHead title={title} />

          <main>
            {children}
          </main>
        </>
    )
}

export default ActivationLayout;