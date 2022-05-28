import Head from "next/head";

interface Props {
  title?: string;
  keywords?: string;
  descriptions?: string;
}

const Meta = ({ 
  title = "WebDev News", 
  keywords="web development, programming", 
  descriptions="Get the latest news in web dev",
}: Props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={descriptions} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{ title }</title>
    </Head>
  );
}

export default Meta;