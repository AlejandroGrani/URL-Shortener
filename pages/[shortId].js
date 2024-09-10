import { PrismaClient } from "@prisma/client";
import { redirect } from "next/dist/server/api-utils";
export default function ShortIdPage(){

    return( <div>ShortId Redirect</div>);
        
}

 export async function getServerSideProps({params}) {
    const prisma = new PrismaClient();
    const { shortId } = params;


    const data = await prisma.link.findUnique({
        where: {
            shortUrl: shortId
        },
    });

    if(!data) {
        return { redirect: {destination: '/'} };
    }
        
    return{
        redirect: {destination: data.url},
    };
 }