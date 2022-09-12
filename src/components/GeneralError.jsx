import { messageForCode } from "../utils/message.util"


const GeneralError = ({code}) => {
    const message = messageForCode(code);
  return (
    <>
        {code.length>0 && <p>{message}</p>}
    </> 
  )
}

export default GeneralError