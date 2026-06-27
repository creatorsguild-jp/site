import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/layouts/layout'
import UnderConstruction from '../components/pages/UnderConstruction'

const RemotePage: NextPage = () => (
  <Layout title="リモート参加について">
    <UnderConstruction heading="リモート参加について" />
  </Layout>
)

export default RemotePage
