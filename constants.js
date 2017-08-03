
const pages = {
  homeDescription: 'Official website of Aaron Greenwald, a software developer/programmer in Tel Aviv, Israel (formerly Washington, DC).',
  blogDesc: `Aaron Greenwald's sparsely populated blog about software, coding, and more. Sometimes sarcastic, occasionally entertaining, always enlightening.`,
  cvDesc: `Aaron Greenwald's resume/professional bio - software developer, programmer.`,
  workDesc: `Aaron Greenwald's coding projects and hobby software.`,
  talksDesc: `̄A selection of Aaron Greenwald's public appearances: talks and workshops`
};
const talks = {
  2017: {
    ['react-amsterdam']: {
      ['testing-react-native']: {
        title: 'Testing & React Native: Lessons from the Battlefield',
        description: 'Slides for talk about Testing React Native applications'
      }
    },
    ['riga-dev-days']: {
      ['react-native-intro']: {
        title: 'Learn Once, Write Anywhere: Intro to React Native',
        description: 'Slides for talk about introducing and explaining React Native'
      }
    },
    academy: {
      geekspeak: {
        title: 'Geekspeak for Humans: Translating Technobabble to Human Language',
        description: 'Slides for talk - Geekspeak for Humans'
      }
    },
    ['rn-eu']: {
      ['scaling-rn']: {
        title: 'Scaling React Native Development: Making it Work',
        description: 'Slides for talk at React Native EU conference'
      }
    }
  }
};

module.exports = {
  pages,
  talks
};