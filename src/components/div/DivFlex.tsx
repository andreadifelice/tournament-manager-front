import React from 'react'

type DivFlexProps = {
    children?:React.ReactNode;
}

const DivFlex = ({children}: DivFlexProps) => {
    return (
        <div className="w-full lg:flex-1 border-2 border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col gap-5">
            {children}
        </div>
    )
}

export default DivFlex