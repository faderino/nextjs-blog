import Date from "../components/date";
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { useEffect, useState } from "react";

export default function Home({ allPostsData, hello }) {
  // const [hello, setHello] = useState(null);

  // useEffect(() => {
  // fetch("http://localhost:3000/api/hello")
  //   .then((res) => res.json())
  //   .then((res) => setHello(res));
  // }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          {hello?.text}, I'm <b>Fadi</b>. I'm a software engineer and I love
          front end!. You can find and contact me on{" "}
          <a href="https://www.linkedin.com/in/fadi99/">LinkedIn</a>.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  // Get all post data
  const allPostsData = getSortedPostsData();

  // Get hello
  const hello = await fetch("http://localhost:3000/api/hello").then((res) =>
    res.json()
  );

  return {
    props: {
      allPostsData,
      hello,
    },
  };
}
