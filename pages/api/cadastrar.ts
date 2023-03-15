import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB }from '../../middlewares/conectarMongoDB';
import type { respostaPadraoMsg } from "../../types/respostaPadraoMsg";
import type { cadastroRequisicao } from "../../types/cadastroRequisicao";
import { livrosModel } from '../../models/livrosModel';

const endpointCadastrar =
    async (req : NextApiRequest, res : NextApiResponse<respostaPadraoMsg>) =>{
        
        if(req.method === 'POST'){
            const livros = req.body as cadastroRequisicao;

            if(!livros.titulo || livros.titulo.length < 2){
                return res.status(400).json({erro : 'Titulo invalido'});
            }

            if(!livros.autor || livros.autor.length < 2){
                return res.status(400).json({erro : 'Autor invalido'});
            }

            if(!livros.editora || livros.editora.length < 2){
                return res.status(400).json({erro : 'Editora invalida'});
            }

            if(!livros.ano){
                return res.status(400).json({erro : 'Ano invalido'});
            }

            // salvar dados no banco de dados
            await livrosModel.create(livros);
            return res.status(200).json({msg: 'Livro cadastrado com sucesso'});

        }
        return res.status(405).json({ erro : 'Método informado não é valido'});
    }

    export default conectarMongoDB(endpointCadastrar);
