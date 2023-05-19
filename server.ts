import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const fastify = Fastify()
fastify.register(cors, { 
  
})

fastify.post('/cadastro', async(req : any, reply : any) => {
  const panda = await prisma.panda.create({
    data: {
      nome: req.body.Nome,
      personalidade: req.body.Personalidade,
      idade: req.body.Idade,
      vacinado: req.body.Vacinado
    }
  })
  reply.send('Criado com sucesso')
})

fastify.get('/busca/:nome', async(req: any, reply : any) => {
  let nome = req.params.nome
  let panda = await prisma.panda.findUnique({
    where: {
      nome: nome
    }
  })
  reply.send(panda)
})

fastify.get('/busca/todos', async(req: any, reply : any) => {
  let nome = req.params.nome
  let panda = await prisma.panda.findMany()
  reply.send(panda)
})

fastify.put('/atualizar/:nome', async(req: any, reply : any) => {
  let nome = req.params.nome
  await prisma.panda.update({
    where: {
      nome: nome
    },
    data: {
      nome: req.body.Nome,
      personalidade: req.body.Personalidade,
      idade: req.body.Idade,
      vacinado: req.body.Vacinado
    }
  })

  let mostrar = await prisma.panda.findUnique({
    where: {
      nome: req.body.Nome
    }
  })
  reply.send(mostrar)
})


fastify.delete('/deletar/:nome', async(req: any, reply : any) => {
  let nome = req.params.nome
  let panda = await prisma.panda.delete({
    where: {
      nome: nome
    }
  })
  reply.send("Panda apagado com sucesso")
})

fastify.listen({ port: 3000 })
console.log('Online')