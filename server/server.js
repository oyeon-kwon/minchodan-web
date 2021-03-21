const express = require('express');
const { graphql, buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
type Users {
    id: Int!
    nickname: String!
    password: String!
  }
  type Category {
    id: Int!
    category: String!
  }
  type Post {
    id: Int!
    createdAt: String!
    title: String!
    thumbnail: String
    verse: String
    detailId: Int!
    content: Content!
  }
  type Content {
    id: Int!
    content: String!
    postId: Int!
  }
  type Query {
    signin(nickname: String!, password: String!): Boolean!
    signout: Boolean!
    isSignin: Boolean!
    getCategory(category: Int!, detail: Int!): [Post]!
    getContent(id: Int!): Post!
  }
  type Mutation {
    signup(nickname: String!, password: String!): Users!
    addContent(
      category: String!
      title: String!
      content: String!
      datetime: String!
      thumbnail: String
      verse: String
    ): Boolean!
    updateContent(
      id: Int!
      category: String!
      title: String!
      content: String!
      datetime: String!
      thumbnail: String
      verse: String
    ): Boolean!
    deleteUser(nickname: String!): Boolean!
    deleteContent(id: Int!): Boolean!
    addComment(
      content: String!
      datetime: String!
    ): Boolean!
    deleteComment(id: Int!): Boolean!
  }
`);
 
// The root provides a resolver function for each API endpoint
let root = {
    signin: async ({nickname, password}, { prisma, req, res }) => {
        try {
          const result = await prisma.user.findUnique({
            where: { 
              nickname
            }
          })
          console.log('result: ', result);
    
          let isCorrect = await bcrypt.compare(password, result.password)
          if (result === null || !isCorrect) return false;
          else {
            req.session.isLogged = true;
            return true;
          }
    
        } catch(err) {
          return false;
        }
      },
      signout: async (_, { prisma, req, res }) => {
        req.session.isLogged = false;
        return true;
      },
      signup: async({nickname, password}, context) => {
        const hash = await bcrypt.hash(password, saltRounds);
        return await context.prisma.user.create({
          data: {
            nickname,
            password: hash,
          }
        })
      },
      getCategory: async ({ category, detail }, { prisma, req, res }) => {
        let result = await prisma.category.findMany({
          where: {
            id: category
          },
          select: { 
            details: {
              where: {
                id: detail
              },
              select: {
                posts: {
                  orderBy: {
                    id: 'desc'
                  },
                }
              }
            }
          },
        })
        return result[0].details[0].posts;
      },
      getContent: async ({ id }, context) => {
        return await context.prisma.post.findUnique({
          where: {
            id: id
          },
          select: {
            id: true,
            title: true, 
            detailId: true,
            createdAt: true,
            thumbnail: true,
            verse: true,
            content: {
              include: {
                post: true,
              }
            }
          }
        })
      },
      addContent: async ({ category, title, content, datetime, thumbnail, verse }, context) => {
        const isCreated = await context.prisma.post.create({
          data: {
            title, thumbnail, verse,
            createdAt: datetime,
            detail: {
              connect: { id: Number(category) }
            },
            content: {
              create: { 
                content
              }
            }
          }
        })
        return isCreated ? true : false;
      },
      updateContent: async({ id, category, title, content, datetime, thumbnail, verse }, context) => {
        const isUpdated = await context.prisma.post.update({
          where: {
            id: id
          },
          data: {
            title, thumbnail, verse,
            createdAt: datetime,
            detail: {
              connect: { id: Number(category) }
            },
            content: {
              create: { 
                content
              }
            }
          }
        })
        return isUpdated ? true : false;
      },
      deleteContent: async({ id }, context) => {
        const findLinked = await context.prisma.post.findMany({ where: { id }, include: { content: true } })
        const delPost = await context.prisma.post.delete({ where: { id: id } })
        const delContent = await context.prisma.content.delete({ where: { id: findLinked[0].content.id } })
        return delPost && delContent ? true : false;
      },
      addComment: async ({ post, content, datetime }, context) => {
        const isCreated = await context.prisma.post.create({
          data: {
            createdAt: datetime,
            detail: {
              connect: { id: Number(post) }
            },
            content: {
              create: { 
                content
              }
            }
          }
        })
        return isCreated ? true : false;
      },
      deleteComment: async({ id }, context) => {
        const delComment = await context.prisma.post.delete({ where: { id: id } })
        return delPost && delComment ? true : false;
      },
};

app.use('/graphql', graphqlHTTP(async(req, res) => 
  ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { prisma, req, res },
  })
));

// Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ signout }', root).then((response) => {
//   console.log(response);
// });


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
