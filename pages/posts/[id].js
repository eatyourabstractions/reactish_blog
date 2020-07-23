import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import ThemeContext from '../../components/ThemeContext'
import React, { useContext } from 'react';

export default function Post({ postData }) {
  const {color} = useContext(ThemeContext);
  

    return (
      <>
        <style>
            {` 
              .myFont{
                color: ${color.titleColor};
              }
            `}
      </style>
      <Layout postHtml={postData.contents}>
        <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css"></link>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js"></script>

        <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={'utilStyles.headingXl myFont'}>{postData.title}</h1>
        <div className={'utilStyles.lightText myFont'}>
          <Date dateString={postData.date} />
        </div>
        <div className={'myFont'} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      </Layout>
      </>
    )

   
  }

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }