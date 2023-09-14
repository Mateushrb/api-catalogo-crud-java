import CatalogoCard from '../../Components/CatalogoCard'
import InputEstoque from '../../Components/InputEstoque';

const PaginaInicial = () => {
  return (
    <div>
      <div className='mb flex'>
        <InputEstoque />
        {/* <SelectCategoria /> */}
      </div>
      <CatalogoCard />
    </div>
  )
}

export default PaginaInicial;
