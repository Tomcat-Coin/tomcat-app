# Project Setup

This guide will help you configure and deploy both the server and client for this project.

## Server Configuration

1. Navigate to the `server` folder.
2. Open a terminal and run the following command to install all dependencies:

    ```bash
    npm install
    ```

3. Open the `server.ts` file and add your MongoDB URI.
4. Open the `app.ts` file, locate the token section, and add your bot token.
5. Deploy the server to get the domain link.
6. Go back to the `server.ts` file and add the domain link you obtained.
7. Before deploying again, make sure to compile the TypeScript files by running:

    ```bash
    tsc
    ```

## Client Configuration

1. Navigate to the `client` folder.
2. Open the `BaseApi.tsx` file.
3. Add the domain link you obtained from the server deployment.

## Deployment

1. After setting up both the server and client, deploy the project.
2. Ensure everything is properly configured and running.
# TomCat-Coin-
