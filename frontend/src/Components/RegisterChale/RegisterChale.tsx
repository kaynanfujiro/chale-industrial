import { FormEvent, useState, useRef } from "react"
import { LabelChale } from "./LabelChale"

export const RegisterChale = () =>{

    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Type, setType] = useState("");
    const [ValueAluguel, setValueAluguel] = useState("");
    const [ImagemP, setImagemP] = useState<File | null>(null);
    const [Imagens, setImagens] = useState<File[]>([]);
    const [Video, setVideo] = useState<File | null>(null);

    const imagemPRef = useRef<HTMLInputElement>(null);
    const imagensRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);

    const url = "http://localhost:3000";

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", Name);
        formData.append("description", Description);
        formData.append("type", Type);
        formData.append("value", ValueAluguel);
        Imagens.forEach((imagem) => {
            formData.append(`images`, imagem);
          });

        if (ImagemP) {
            formData.append("imageP", ImagemP);
          }
        if(Video){
            formData.append("video", Video);
        }
        

        try{
            const response = await fetch(`${url}/alugueis`, {
                method: "POST",
                body: formData,
            });

            if(response.ok){
                window.alert("Chale cadastrado com sucesso!");

                setName("");
                setDescription("");
                setType("");
                setValueAluguel("");
                setImagemP(null);
                setImagens([]);
                setVideo(null);

                if (imagemPRef.current) imagemPRef.current.value = "";
                if (imagensRef.current) imagensRef.current.value = "";
                if (videoRef.current) videoRef.current.value = "";

            }else{
                console.error("Erro ao cadastrar aluguel:", await response.text());
            }
        }catch(error) {
            console.error("Erro ao enviar dados", error)
        }
    };

    return(
        <>
        <div className="m-4">
            <span className="font-bold">
                <h1 className="text-2xl">Registrando Chale</h1>
            </span>

            <div className="w-[full] flex flex-col m-2 p-4 gap-5 justify-center items-center">
                
                <form className="flex flex-col justify-center items-center 
                gap-8 shadow-xl border-solid border-2 hover:border-gray-300
                w-[75%] h-[340px]
                "
                onSubmit={handleSubmit}
                >

                    <div className="flex flex-row items-start gap-5">
                        <div className="flex flex-col">

                            <LabelChale>Nome:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500" 
                            type="text" 
                            placeholder="Digite o nome do local..."
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            />

                            <LabelChale>Descrição:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"  
                            type="text" 
                            placeholder="Digite uma descrição do local"
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            />

                            <LabelChale>Tipo:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"  
                            type="text" 
                            placeholder="Digite que tipo de local é (ex: Chale)"
                            value={Type}
                            onChange={(e) => setType(e.target.value)}
                            />

                            <LabelChale>Valor de Alugel:</LabelChale>
                            <input className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"  
                            type="number" 
                            placeholder="Digite o valor de aluguel"
                            value={ValueAluguel}
                            onChange={(e) => setValueAluguel(e.target.value)}
                            />

                        </div>

                        <div className="flex flex-col">

                            <LabelChale>Imagens Principal:</LabelChale>
                            <input className="block w-full mb-5 text-xs text-gray-900 border
                             border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                             id="small_size" 
                             type="file"
                             accept="image/*"
                             onChange={(e) => setImagemP(e.target.files?.[0] || null)}
                             />

                            <LabelChale>Imagens Gerais:</LabelChale>
                            <input className="block w-full mb-5 text-xs text-gray-900 border
                             border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                             id="small_size" 
                             type="file"
                             multiple
                             onChange={(e) =>
                                setImagens(e.target.files ? Array.from(e.target.files): [])
                             }
                             />

                            <LabelChale>Video:</LabelChale>
                            <input className="block w-full mb-5 text-xs text-gray-900 border
                             border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                             id="small_size" 
                             type="file"
                             accept="vide/*"
                             onChange={(e) => {
                                setVideo(e.target.files?.[0] || null)
                              }}
                              />

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