import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarMongoDB }from '../../middlewares/conectarMongoDB';
import type { respostaPadraoMsg } from '../../types/respostaPadraoMsg';


const endpointBuscar = (
    req: NextApiRequest,
    res: NextApiResponse <respostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {titulo, autor, editora, ano} = req.body;

    if(titulo === 'Dom Casmurro' &&
       autor === 'Machado de Assis' &&
       editora === 'Companhia das Letras' &&
       ano === '1899'){
            return res.status(200).json({msg: 'Livro localizado com sucesso'});
       }
       return res.status(405).json({erro: 'Uma ou mais informações incorretas'});    
    }
    return res.status(405).json({erro: 'Método informado não é valido'});
}

export default conectarMongoDB(endpointBuscar);