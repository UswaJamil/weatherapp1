import * as prismic from '@prismicio/client';

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPO_NAME || '';

export const createClient = (options = {}) => {
  const client = prismic.createClient(repositoryName, {
    ...options,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
  return client;
};
