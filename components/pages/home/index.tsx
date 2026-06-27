import React from 'react'
import { NextPage } from 'next'
import Hero from "./Hero";
import IntroSection from "./IntroSection";
import Layout from "../../layouts/layout";
import { introSections } from "../../../content/home";

const Home: NextPage = () => (
  <Layout title="Topページ">
    <section id="content">
      <div className="inbox">
        <Hero />
        {introSections.map((section) => (
          <IntroSection key={section.id} section={section} />
        ))}
      </div>
    </section>
  </Layout>
)

export default Home