import PageHead from "@/components/commons/PageHead"
import React from "react";


interface TypeProps {
    title: string;
    children: React.ReactNode
}
const LandingPageLayout = (props: TypeProps) => {
    const {
        title,
        children
    } = props;

    return (
        <main>
            <PageHead title={title} />
            
            {children}            

            
        </main>
    )
}

export default LandingPageLayout;