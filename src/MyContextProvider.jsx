import React from 'react'
import { createContext } from 'react'

export const UserContext=createContext();

export default function MyContextProvider({children}) {

    const host= "http://localhost:8100" // port number as per backend

  return (
    <div>
      <UserContext.Provider value={{host}}>
              {children}
            </UserContext.Provider>
    </div>
  )
}
