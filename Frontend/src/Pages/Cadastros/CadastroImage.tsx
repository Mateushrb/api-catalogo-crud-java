import React, { useState } from 'react';

interface ImageData {
  imagem: File | null;
}

interface Props {
  onNext: (data: ImageData) => void;
}

const CadastroImage: React.FC<Props> = ({ onNext }) => {
  const [formData, setFormData] = useState<ImageData>({
    imagem: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData({
      imagem: file,
    });
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div>
      <h2>Cadastro de Imagem</h2>
      <form>
        <div>
          <label>Imagem:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </form>
      <button onClick={handleNext}>Concluir Cadastro</button>
    </div>
  );
};

export default CadastroImage;
