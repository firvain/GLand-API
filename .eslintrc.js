module.exports = {
  root: true,
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': 0
  }
}
