import type { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import mongoose from "mongoose";
import type { respostaPadraoMsg } from '../types/respostaPadraoMsg';

export const conectarMongoDB = (handler : NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) =>{


        //verificar se o banco está conectado, se estiver seguir para o endpoint ou proximo middleware
        if(mongoose.connections[0].readyState){
            return handler(req, res);
        }

        //já que não está conectado vamos conectar 
        // 1º passo => Obter a variavel de ambiente preenchida do env
        const {DB_CONEXAO_STRING} = process.env;

        //se a env estiver vazia abortar o uso do sistema e avisar o programador
        if(!DB_CONEXAO_STRING){
            return res.status(500).json({erro: 'ENV de configuração do banco não informado'});
        }
       
    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
    mongoose.connection.on('error', error => console.log(`Ocorreu erro ao conectar no banco de dados: ${error}`));
    await mongoose.connect(DB_CONEXAO_STRING);

    //agora posso seguir para o endpoint pois estou conectado no banco de dados 
    return handler(req, res);

    }