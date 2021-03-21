var express = require('express');
var { graphqlHTTP } = require('express-graphql');
import schema from './src/schema';
import root from './src/root';
import { PrismaClient } from '@prisma/client';

var app = express();

app.use('/graphql', graphqlHTTP(async(req, res) => 
  ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { prisma, req, res },
  })
));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

// axios.get(`/feedPost/feedPosts_id?id=${feedPostId}`) 요 라우팅 하나 만들어야 함

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true },
  })
  console.log(post)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })