import "reflect-metadata";
import "core-js/stable";
import "core-js/stage";
import "regenerator-runtime/runtime";

import React from "react";
import Application from "./Application";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./sass/common.scss";

const domNode = document.getElementById("container");
const root = createRoot(domNode);
const url = process.env.SERVER_ENDPOINT ?? "http://localhost:3010";

function prependProtocol(url: string): string {
  if (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("//")
  ) {
    return url;
  } else {
    return `//${url}`;
  }
}

const client = new ApolloClient({
  uri: `${prependProtocol(url)}/api/v0/graphql`,
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <Application />
  </ApolloProvider>,
);
