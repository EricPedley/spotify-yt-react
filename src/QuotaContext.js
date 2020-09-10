import React, {useState} from "react";
const QuotaContext = React.createContext();
export default QuotaContext;
export function QuotaContextProvider(props) {
    const [quota,setQuota] = useState();
    return (
        <QuotaContext.Provider value = {{quota,setQuota}}>
            {props.children}
        </QuotaContext.Provider>
    )
}