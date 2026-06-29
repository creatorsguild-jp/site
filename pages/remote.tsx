import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/layouts/layout';
import UnderConstruction from '../components/pages/UnderConstruction';
import { pageMeta } from '../content/site';

const RemotePage: NextPage = () => (
  <Layout meta={pageMeta.remote}>
    <UnderConstruction heading="リモート参加について" />
  </Layout>
);

export default RemotePage;
