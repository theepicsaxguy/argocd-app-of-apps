module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'ci', 'build', 'revert'
    ]],
    'scope-empty': [2, 'never'], // ❌ SCOPE IS ALWAYS REQUIRED
    'type-case': [2, 'always', 'lower-case'], // ❌ TYPE MUST BE LOWERCASE
    'subject-case': [2, 'always', 'lower-case'], // ✅ subject must be lowercase
    'header-max-length': [2, 'always', 50], // ❌ FIRST LINE MUST BE ≤ 50 CHARACTERS
    'body-max-line-length': [2, 'always', 72], // ❌ BODY LINES MUST BE ≤ 72 CHARACTERS
    'footer-leading-blank': [2, 'always'], // ❌ THERE MUST BE A BLANK LINE BEFORE FOOTER
    'subject-empty': [2, 'never'], // ❌ SUBJECT CANNOT BE EMPTY
    'subject-full-stop': [2, 'never'], // ❌ SUBJECT CANNOT END WITH PUNCTUATION
    'references-empty': [0, 'never'], // ⚠️ ISSUE REFERENCES ARE OPTIONAL
    'trailer-exists': [1, 'always', 'BREAKING CHANGE'],
  }
};
