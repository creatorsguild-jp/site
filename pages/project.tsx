import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/layouts/layout';
import UnderConstruction from '../components/pages/UnderConstruction';
import { pageMeta } from '../content/site';

const ProjectPage: NextPage = () => (
  <Layout meta={pageMeta.project}>
    <UnderConstruction heading="プロジェクト紹介" />
  </Layout>
);

export default ProjectPage;
