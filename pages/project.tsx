import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/layouts/layout'
import UnderConstruction from '../components/pages/UnderConstruction'

const ProjectPage: NextPage = () => (
  <Layout title="プロジェクト紹介">
    <UnderConstruction heading="プロジェクト紹介" />
  </Layout>
)

export default ProjectPage
