module.exports = {
  webpack: {
    htmlPlugin: {
      template: './example/index.html',
    },
    cssScopeName: '[local]',
    pxtorem: {
      rootValue: 100,
      propList: [
        '*',
        '!min-width',
        '!border',
        '!border-left',
        '!border-right',
        '!border-top',
        '!border-bottom',
      ],
      selectorBlackList: [
        'no_rem',
      ],
    },
  },
};
