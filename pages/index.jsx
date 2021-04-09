import React from 'react';
import Layout from '../components/Layout';

const Index = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
          <h2>
            A random astronaut food generatorfor your outer space missons. Or
            create your own meals.
          </h2>
          <button>Generate Now</button>
        </main>
      </div>
    </Layout>
  );
};

export default Index;
