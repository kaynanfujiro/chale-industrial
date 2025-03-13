import { LabelChale } from "./LabelChale"

export const RegisterChale = () =>{
    return(
        <>
        <div className="m-4">
            <span className="font-bold">
                <h1>Registrando Chale</h1>
            </span>

            <div className="w-[full] flex flex-col m-2 p-4 gap-5 justify-center items-center">
                <form className="flex flex-col justify-center items-center 
                gap-8 shadow-xl border-solid border-2 hover:border-gray-300
                w-[75%] h-[300px]
                ">

                    <div className="flex flex-row items-start gap-5">
                        <div className="flex flex-col">
                            <LabelChale>Nome:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500" 
                            type="text" 
                            placeholder="Digite o nome do local..."/>
                            <LabelChale>Descrição:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"  
                            type="text" 
                            placeholder="Digite uma descrição do local" />
                            <LabelChale>Valor de Alugel:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"  
                            type="number" 
                            placeholder="Digite o valor de aluguel"/>
                        </div>

                        <div className="flex flex-col">
                        <LabelChale>Imagens Principal:</LabelChale>
                            <input className="block w-full mb-5 text-xs text-gray-900 border
                             border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                             id="small_size" 
                             type="file"
                             accept="image/*"/>
                            <LabelChale>Imagens Gerais:</LabelChale>
                            <input className="block w-full mb-5 text-xs text-gray-900 border
                             border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                             id="small_size" 
                             type="file"
                             multiple/>
                            <LabelChale>Video:</LabelChale>
                            <input className="block w-full mb-5 text-xs text-gray-900 border
                             border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                             id="small_size" 
                             type="file"
                             accept="vide/*"/>
                        </div>
                    </div>

                    <span className="flex">
                        <button className="cursor-pointer bg-red-500 rounded-md w-[120px] h-[30px] text-white hover:font-bold hover:shadow-lg">Cadastrar Local</button>
                    </span>


                </form>
            </div>

        </div>
        </>
    )
}