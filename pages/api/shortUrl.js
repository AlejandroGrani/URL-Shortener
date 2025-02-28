import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    const { url } = req.body;
    const shortUrl = Math.random().toString(36).substring(2, 5);
    res.status(200).send({ url, shortUrl });

    try {
      const data = await prisma.link.create({
        data: {url, shortUrl},
      });

      return res.status(200).send({data});  
    } catch (error){
      return res.status(500).send({error});  

    }
    


  };

  