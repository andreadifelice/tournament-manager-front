import React from "react"

type DivMax4Props = {
    children?: React.ReactNode;
}

const DivMax4 = ({ children }: DivMax4Props) => {
    return (
        <div className="px-4 w-full md:max-w-4xl mx-auto">
            {children}
        </div>
    )
}

export default DivMax4