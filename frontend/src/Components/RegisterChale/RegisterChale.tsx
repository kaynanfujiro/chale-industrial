import { FormEvent, useState, useRef, useEffect } from "react";
import { LabelPadrao } from "./LabelPadrao";

type ChaleData = {
  id?: string;
  name: string;
  description: string;
  type: string;
  value: string;
};

export const RegisterChale = ({ chaleToEdit }: { chaleToEdit?: ChaleData }) => {
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<ChaleData>({
    name: "",
    description: "",
    type: "",
    value: "",
  });
  const [imageP, setImageP] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageP, setPreviewImageP] = useState<string | null>(null);

  const imagePRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const url = "http://localhost:3000";

  useEffect(() => {
    if (chaleToEdit) {
      setFormMode("edit");
      setFormData({
        id: chaleToEdit.id,
        name: chaleToEdit.name,
        description: chaleToEdit.description,
        type: chaleToEdit.type,
        value: chaleToEdit.value,
      });
      // Se tivesse URLs das imagens poderia carregar as previews aqui
    }
  }, [chaleToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageP(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageP(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImageP(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      value: "",
    });
    setImageP(null);
    setImages([]);
    setVideo(null);
    setPreviewImageP(null);
    
    if (imagePRef.current) imagePRef.current.value = "";
    if (imagesRef.current) imagesRef.current.value = "";
    if (videoRef.current) videoRef.current.value = "";
    
    setFormMode("create");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    
    // Adicionar campos de texto
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("value", formData.value);
    
    // Adicionar arquivos
    if (imageP) {
      formDataToSend.append("imageP", imageP);
    }
    
    images.forEach((image) => {
      formDataToSend.append("images", image);
    });
    
    if (video) {
      formDataToSend.append("video", video);
    }

    try {
      const endpoint = formMode === "edit" 
        ? `${url}/alugueis/${formData.id}`
        : `${url}/alugueis`;
        
      const method = formMode === "edit" ? "PUT" : "POST";
      
      const response = await fetch(endpoint, {
        method: method,
        body: formDataToSend,
      });

      if (response.ok) {
        const action = formMode === "edit" ? "atualizado" : "cadastrado";
        window.alert(`Chalé ${action} com sucesso!`);
        resetForm();
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error(`Erro ao ${formMode === "edit" ? "atualizar" : "cadastrar"} chalé:`, error);
      window.alert(`Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {formMode === "edit" ? "Editando Chalé" : "Registrando Chalé"}
        </h1>
        {formMode === "edit" && (
          <button 
            onClick={resetForm}
            className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
          >
            Novo Cadastro
          </button>
        )}
      </div>

      <div className="w-full flex justify-center">
        <form 
          className="flex flex-col w-[90%] lg:w-[80%] p-6 gap-6 shadow-xl border-2 border-solid rounded-lg hover:border-gray-300 transition-all"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1 - Informações básicas */}
            <div className="space-y-4">
              <div>
                <LabelPadrao>Nome:</LabelPadrao>
                <input 
                  className="w-full shadow-md border-2 border-black rounded-md p-2 hover:border-gray-500 focus:outline-none focus:border-red-500 transition-colors" 
                  type="text" 
                  name="name"
                  placeholder="Digite o nome do local..."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <LabelPadrao>Descrição:</LabelPadrao>
                <textarea 
                  className="w-full shadow-md border-2 border-black rounded-md p-2 hover:border-gray-500 focus:outline-none focus:border-red-500 transition-colors min-h-[100px]" 
                  name="description"
                  placeholder="Digite uma descrição detalhada do local"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <LabelPadrao>Tipo:</LabelPadrao>
                  <input 
                    className="w-full shadow-md border-2 border-black rounded-md p-2 hover:border-gray-500 focus:outline-none focus:border-red-500 transition-colors" 
                    type="text" 
                    name="type"
                    placeholder="Ex: Chalé, Cabana..."
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <LabelPadrao>Valor do Aluguel (R$):</LabelPadrao>
                  <input 
                    className="w-full shadow-md border-2 border-black rounded-md p-2 hover:border-gray-500 focus:outline-none focus:border-red-500 transition-colors" 
                    type="number" 
                    name="value"
                    placeholder="Valor em reais"
                    value={formData.value}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Coluna 2 - Upload de arquivos */}
            <div className="space-y-4">
              <div>
                <LabelPadrao>Imagem Principal:</LabelPadrao>
                <div className="flex flex-col items-center space-y-2">
                  {previewImageP && (
                    <div className="w-full h-40 mb-2 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                      <img 
                        src={previewImageP} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  <input 
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 focus:outline-none transition-colors" 
                    type="file"
                    accept="image/*"
                    ref={imagePRef}
                    onChange={handleImagePChange}
                  />
                </div>
              </div>

              <div>
                <LabelPadrao>Imagens Gerais:</LabelPadrao>
                <input 
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 focus:outline-none transition-colors" 
                  type="file"
                  accept="image/*"
                  multiple
                  ref={imagesRef}
                  onChange={(e) => setImages(e.target.files ? Array.from(e.target.files) : [])}
                />
                {images.length > 0 && (
                  <p className="mt-1 text-sm text-gray-600">{images.length} imagens selecionadas</p>
                )}
              </div>

              <div>
                <LabelPadrao>Vídeo:</LabelPadrao>
                <input 
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 focus:outline-none transition-colors" 
                  type="file"
                  accept="video/*"
                  ref={videoRef}
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                />
                {video && (
                  <p className="mt-1 text-sm text-gray-600">Vídeo selecionado: {video.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button 
              type="submit"
              className="px-6 py-3 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : formMode === "edit" ? "Atualizar Chalé" : "Cadastrar Chalé"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};