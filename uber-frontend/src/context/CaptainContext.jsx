import { createContext,useState,useContext } from "react";

export const CaptainDataContext = createContext();


const CaptainContext = ({children}) =>{
    const [captain,setCaptain] =useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState(null);
    const updateCaptin =(captainData) =>{
        setCaptain(captainData)
    };
    const value ={
        captain,
        setCaptain,
        setIsLoading,
        error,
        setError,
        updateCaptin
    };
    return(
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
};
export default CaptainContext;