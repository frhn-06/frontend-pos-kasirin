import PageHead from "@/components/commons/PageHead"

interface TypeProps {
    title: string;
    children: React.ReactNode;
}
const OrderReceiptLayout = (props: TypeProps) => {
    const {
        title,
        children
    } = props;

    return (
        <main>
          <PageHead title={title} />

          <section className="flex flex-col py-12 justify-center items-center bg-default-200 min-h-screen">
            {children}
          </section>
        </main>
    )
}

export default OrderReceiptLayout;