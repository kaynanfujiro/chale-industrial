

export const Login = () => {
    return(
            <form className="flex justify-center items-center h-[400px]">
                <div className="flex flex-col justify-center items-center gap-4 w-[250px] h-[250px] shadow-xl border-solid border-2 hover:border-gray-300">
                    <div className="flex flex-col items-start gap-5">
                        <span className="flex flex-col items-start">
                            <label className="block mb-1 text-sm font-medium text-gray-900">Login:</label>
                            <input type="text" className="border-solid border-2 shadow-xl border-gray-500 rounded-md bg-gray-200 hover:border-black p-1" />
                        </span>

                        <span className="flex flex-col items-start">
                            <label className="block mb-1 text-sm font-medium text-gray-900">Senha:</label>
                            <input type="password" className="border-solid border-2 shadow-xl border-gray-500 rounded-md bg-gray-200 hover:border-black p-1" />
                        </span>
                    </div>
                    <button className="cursor-pointer bg-red-500 rounded-xl w-[120px] h-[30px] text-white hover:font-bold hover:shadow-lg">Entrar</button>
                </div>
            </form>
    )
}