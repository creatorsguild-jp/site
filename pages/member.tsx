import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/layouts/layout';
import UnderConstruction from '../components/pages/UnderConstruction';
import { pageMeta } from '../content/site';

const MemberPage: NextPage = () => (
  <Layout meta={pageMeta.member}>
    <UnderConstruction heading="メンバー紹介" />
  </Layout>
);

export default MemberPage;
