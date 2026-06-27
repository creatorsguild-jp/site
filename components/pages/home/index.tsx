import React from 'react'
import { NextPage } from 'next'
import Hero from "./Hero";
import IntroProject from "./IntroProject";
import IntroShare from "./IntroShare";
import IntroJoin from "./IntroJoin";
import Layout from "../../layouts/layout";

const Home: NextPage = () => (
  <Layout title="Topページ">
    <section id="content">
      <div className="inbox">
        <Hero />
        <IntroProject />
        <IntroShare />
        <IntroJoin />
      </div>
    </section>
  </Layout>
)

export default Home