import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from 'http';
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";
import authRoutes from './routes/auth.ts';
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 9000;
const app = express();
const httpServer = http.createServer(app);
// MONGODB
const mainDbConnection = async () => {
    const uri = `mongodb+srv://bl_developer:${process.env.BL_DEVELOPER_MONGOPASS}@cluster0.vvoqqub.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
        dbName: "snappii"
    });
    console.log("database connected");
};
mainDbConnection().catch((err) => console.log(err));
// GRAPHQL
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await apolloServer.start();
// MIDDLEWARE
app.use('/gql', cors({
    origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}), expressMiddleware(apolloServer));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server connected at http://localhost:${PORT} - YES!`);
