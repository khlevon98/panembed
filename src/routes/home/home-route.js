import React from 'react';
import { connect } from 'react-redux';

import ErrorBoundary from '../../components/error-boundary';

import ProjectList from '../../components/project-list';

import sampleImg from '../../assets/images/sample.jpg';

let idCounter = 0;

const fackeData = [
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
  {
    id: ++idCounter,
    title: 'I am a very simple card.',
    image: sampleImg,
    owner: {
      id: 1,
    },
  },
];

class HomeRoute extends React.Component {
  render() {
    return (
      <section className="section">
        <ErrorBoundary>
          <ProjectList data={fackeData} />
        </ErrorBoundary>
      </section>
    );
  }
}

export default connect()(HomeRoute);
