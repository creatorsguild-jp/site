module.exports = {
  '*.{js,ts,tsx,json,*rc,graphql,yml}': ['prettier --write'],
  '*.{ts,tsx}': ['eslint --cache --fix'],
}
