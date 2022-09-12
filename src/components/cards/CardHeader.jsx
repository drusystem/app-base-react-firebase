

const CardHeader = ({title}) => {
  return (
    <>
        <h5 className="text-center mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            {title}
        </h5>
        <hr  className="my-3"/>
    </>
  )
}

export default CardHeader