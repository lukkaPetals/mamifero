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
})



fastify.listen({ port: 3000 })
console.log('Online')