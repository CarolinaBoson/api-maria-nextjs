import {NextApiRequest, NextApiResponse} from 'next';
import { livrosModel } from '../../models/livrosModel';
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { respostaPadraoMsg } from "../../types/respostaPadraoMsg";

const deletar = (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) =>{

    //Excluir livro
    if(req.method === 'DELETE'){
        livrosModel.findByIdAndDelete({_id:  req.headers.id});
    }
}

export default conectarMongoDB(deletar);