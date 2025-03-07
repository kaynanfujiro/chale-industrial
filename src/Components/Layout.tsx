import { Header } from "./Header"

export const Layout = ({children}:any) => {
    return(
        <>
            <div className="">
                <Header/>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}