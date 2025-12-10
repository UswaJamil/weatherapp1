import { FC } from 'react';

/**
 * Component for "HeroSearch" Slices.
 */
const HeroSearch: FC<{ slice: Record<string, unknown> }> = ({ slice }) => {
  const sliceType = String((slice as any).slice_type || 'unknown');
  const variation = String((slice as any).variation || 'default');

  return (
    <section data-slice-type={sliceType} data-slice-variation={variation}>
      Placeholder component for hero_search (variation: {variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use the Prismic MCP server with your code editor
       * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default HeroSearch;
