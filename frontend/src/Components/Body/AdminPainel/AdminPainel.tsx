import { ReservasList } from "./ReservasList"




export const AdminPainel = () => {
    return(
        <>
        <div className="flex">
            <div className="w-[15%] p-5 flex flex-col gap-3">
                <button className="border-solid border-2 font-bold text-gray-600 border-gray-500 shadow-lg bg-gray-100 hover:shadow-2xl hover:text-gray-800">
                    <a href="/RegisterChale">Cadastro de Alugueis</a>
                </button>
                
                <button className="border-solid border-2 font-bold text-gray-600 border-gray-500 shadow-lg bg-gray-100 hover:shadow-2xl hover:text-gray-800">
                    <a href="/EditChale">Editar Info. Alugueis</a>
                </button>
            </div>
            <div className="flex flex-col m-3 p-2 gap-4 justify-center items-center">
                <div>
                    <h1 className="text-2xl font-bold">Painel Admin</h1>
                </div>
                <div className="w-[950px] h-auto md:h-auto sm:h-screen shadow-2xl border-2 border-gray-400 p-5">
                    <ReservasList/>
                </div>
            </div>
        </div>
        </>
    )
}