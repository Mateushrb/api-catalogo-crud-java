import React, { useState } from 'react'
import ButtonAddCategoria from '../../Components/ButtonAddCategoria';
import '../../Style.css'

interface Categoria {
  nome: string;
}

const CadastroCategoria = () => {
  const [categoria, setCategoria] = useState<Categoria>({
    nome: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Categoria cadastrada:', categoria);

    setCategoria({
      nome: '',
    });
  };
  return (
    <div>
      <h2 className='mb'>Cadastro de Categoria</h2>
      <form className='mb flex' onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Categoria:</label>
          </div>
          <input className='styleInputAdd mb'
            type="text"
            name="nome"
            value={categoria.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <ButtonAddCategoria />
        </div>
      </form>
    </div>
  )
}

export default CadastroCategoria
