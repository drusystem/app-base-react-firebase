import { Button } from "flowbite-react"

const CardHeaderTools = ({title,children}) => {
  return (
    <>
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid content-center">
                <h5 className="text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    {title}
                </h5>
            </div>
            <div className="flex flex-row-reverse">
                {children}
            </div>
        </div>
        <hr  className="my-2"/>
    </>
  )
}

export default CardHeaderTools