import { ReservasList } from "./ReservasList"




export const AdminPainel = () => {
    return(
        <>
        <div className="flex flex-col m-3 p-2 gap-4 justify-center items-center">
            <div><a href="RegisterChale">Tset</a></div>
            <div>
                <h1 className="text-2xl font-bold">Painel Admin</h1>
            </div>
            <div className="w-[950px] h-screen shadow-2xl border-2 border-gray-400 p-5">
                <ReservasList/>
            </div>
        </div>
        </>
    )
}