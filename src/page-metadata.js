
const pages = {
  homeDescription: 'Official website of Aaron Greenwald, a software developer/programmer in Tel Aviv, Israel (formerly Washington, DC).',
  blogDesc: `Aaron Greenwald's sparsely populated blog about software, coding, and more. Sometimes sarcastic, occasionally entertaining, always enlightening.`,
  cvDesc: `Aaron Greenwald's resume/professional bio - software developer, programmer.`,
  workDesc: `Aaron Greenwald's coding projects and hobby software.`,
  talksDesc: `̄A selection of Aaron Greenwald's public appearances: talks and workshops`,
  aboutDescription: 'About me'
};

const talks = {
  2017: {
    'react-amsterdam': {
      'testing-react-native': {
        title: 'Testing & React Native: Lessons from the Battlefield',
        description: 'Slides for talk about Testing React Native applications at React Amsterdam 2017'
      }
    },
    'riga-dev-days': {
      'react-native-intro': {
        title: 'Learn Once, Write Anywhere: Intro to React Native',
        description: 'Slides for talk introducing and explaining React Native'
      }
    },
    academy: {
      geekspeak: {
        title: 'Geekspeak for Humans: Translating Technobabble to Human Language',
        description: 'Slides for talk - Geekspeak for Humans'
      }
    },
    'rn-eu': {
      'scaling-rn': {
        title: 'Scaling Mobile Development (with React Native, of course)',
        description: 'Slides for talk at React Native EU 2017 conference'
      }
    },
    startech: {
      'client-server': {
        title: 'Connecting to a Server: Android App Development',
        description: '̄Accompanying slides for session of Startech course'
      }
    },
    dnipro: {
      'testing-react-native': {
        title: 'Testing & React Native: Lessons from the Battlefield',
        description: 'Slides for talk about Testing React Native applications: Meetup in Dnipro, Ukraine'
      }
    },
    mobileera: {
      'rn-code-reuse': {
        title: 'React Native Code Reuse: Architecture that Works',
        description: 'Slides for Mobile Era (Oslo, Norway) talk on reusing code in React Native apps'
      }
    },
    buildstuff: {
      rtl: {
        title: 'Why RTL Support is So Hard: Detours in Abstraction',
        description: 'Slides for BuildStuffLT (Vilnius, Lithuania) talk on right-to-left support in software',
        thumbnail: 'https://i.imgflip.com/1zh1i4.jpg'
      }
    }
  },
  2018: {
    kyiv: {
      'react-native-workshop': {
        title: 'React Native the Hard Way: Workshop',
        description: 'Slides for React Native workshop in Kyiv, Ukraine'
      }
    },
    sofia: {
      'rn-code-reuse': {
        title: 'React Native Code Reuse: Architecture that Works',
        description: 'Slides for talk on reusing code and architecture in React Native apps, delivered in Sofia (Bulgaria)'
      }
    }
  },
  2019: {
    vilnius: {
      'rn-code-reuse': {
        title: 'React Native Code Reuse: Architecture that Works',
        description: 'Slides for talk on reusing code and architecture in React Native apps, delivered in Vilnius (Lithuania)'
      }
    },
    'tel-aviv': {
      'clean-tests': {
        title: 'Tests Are Code, Too!',
        description: 'Slides for talk on clean code in tests, delivered in Tel Aviv, Israel'
      }
    }
  },
  2020: {
    web: {
      'fast-slow': {
        title: 'Go Slow to Go Fast',
        description: 'Slides for webinar talk on tests and velocity hosted by testim.io'
      }
    }
  }
};

module.exports = {
  pages,
  talks
};
