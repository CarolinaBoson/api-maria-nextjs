import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarMongoDB }from '../../middlewares/conectarMongoDB';
import type { respostaPadraoMsg } from '../../types/respostaPadraoMsg';


const endpointCadastrar = (
    req: NextApiRequest,
    res: NextApiResponse <respostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const {login,senha} = req.body;

    if(login === 'admin@admin.com' &&
       senha === 'Admin@123'){
            return res.status(200).json({msg: 'Usuário autenticado com sucesso'});
       }
       return res.status(405).json({erro: 'Usuário ou senha não encontrados'});    
    }
    return res.status(405).json({erro: 'Método informado não é valido'});
}

export default conectarMongoDB(endpointCadastrar);