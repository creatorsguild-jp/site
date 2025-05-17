import React from 'react'
import { NextPage } from 'next'
import MainImageBlock from "./MainImageBlock";
import Introduction from "./Introduction";
import Layout from "../../layouts/layout";

const Home: NextPage = () => (
  <Layout title="Topページ">
    <section id="content">
      <div className="inbox">
        <MainImageBlock />
        <Introduction />
      </div>
    </section>
  </Layout>
)

export default Homet Home