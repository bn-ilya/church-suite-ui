import { Provider } from "react-redux"
import { store } from "./config/store"
import { FC } from "react"
import { IStoreProviderProps } from "./ui.props"

export const StoreProvider: FC<IStoreProviderProps> = ({children}) => {
  return(
    <Provider store={store}>
      {children}
    </Provider>
  )
}