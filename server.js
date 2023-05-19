"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fastify = (0, fastify_1.default)();
fastify.register(cors_1.default, {});
fastify.post('/cadastro', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const panda = yield prisma.panda.create({
        data: {
            nome: req.body.Nome,
            personalidade: req.body.Personalidade,
            idade: req.body.Idade,
            vacinado: req.body.Vacinado
        }
    });
}));
fastify.get('/busca/:nome', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let nome = req.params.nome;
    let panda = yield prisma.panda.findUnique({
        where: {
            nome: nome
        }
    });
    reply.send(panda);
}));
fastify.put('/atualizar/:nome', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let nome = req.params.nome;
    yield prisma.panda.update({
        where: {
            nome: nome
        },
        data: {
            nome: req.body.Nome,
            personalidade: req.body.Personalidade,
            idade: req.body.Idade,
            vacinado: req.body.Vacinado
        }
    });
    let mostrar = yield prisma.panda.findUnique({
        where: {
            nome: req.body.Nome
        }
    });
    reply.send(mostrar);
}));
fastify.delete('/deletar/:nome', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let nome = req.params.nome;
    let panda = yield prisma.panda.delete({
        where: {
            nome: nome
        }
    });
    reply.send("Panda apagado com sucesso");
}));
fastify.listen({ port: 3000 });
console.log('Online');
