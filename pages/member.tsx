import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/layouts/layout'
import UnderConstruction from '../components/pages/UnderConstruction'

const MemberPage: NextPage = () => (
  <Layout title="メンバー紹介">
    <UnderConstruction heading="メンバー紹介" />
  </Layout>
)

export default MemberPage
