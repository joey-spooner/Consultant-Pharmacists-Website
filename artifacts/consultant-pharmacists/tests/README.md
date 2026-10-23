# Calcium sample regression checks

Run from the repository root:

```sh
pnpm --filter @workspace/consultant-pharmacists run test:sample-qa
```

The artifact's `build` script runs these checks before Vite builds the site.
This also gates the root workspace build and the existing GitHub Pages build:
any failing check stops the build before its output can be uploaded.
No credentials, analytics provider, browser or preview server are needed.

The tests load the real site components through an isolated Vite server
and render them with React. Test-only exports expose the existing components;
a test-only analytics spy observes their toggle handler. Neither is shipped.

Coverage:

- A frozen SHA-256 baseline protects the Markdown wording, internal spaces,
  punctuation, symbols and editorial header.
- An independent line-based reader compares all 36 rendered pairs to the
  source, including question/answer adjacency and list order.
- The editorial title, source attribution and spelling-approval notes stay
  in Markdown and out of the displayed sample.
- The Q&A disclosure stays between the sample chapter and preface, starts
  closed, and emits `open_sample_qa` on opening, not rendering or closing.
- Missing, empty, whitespace-only, duplicate, reordered, malformed and extra
  pairs fail explicitly. CRLF source line endings are supported.

If the client deliberately revises the source, review that change and the
editorial notes first, then update `approvedSourceDigest` in the test. Compute
the digest with CRLF normalized to LF (no other whitespace normalization).
Do not update the baseline just to make an unexplained wording change pass.
The existing notes still require the client's OK for two spelling corrections;
this regression baseline does not constitute editorial approval.
