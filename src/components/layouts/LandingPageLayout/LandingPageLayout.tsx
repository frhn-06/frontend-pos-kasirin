import PageHead from "@/components/commons/PageHead"
import React from "react";
import NavbarLayout from "../NavbarLayout";
import FooterLayout from "../FooterLayout";


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

            <>
                <NavbarLayout />
                {children}            
                <FooterLayout />
            </>
        </main>
    )
}

export default LandingPageLayout;