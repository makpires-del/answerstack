# AnswerStack

**Turn repetitive questions into automatic answers.**

AnswerStack is an MVP for a customer FAQ automation product. A business enters its frequently asked questions and answers, previews the assistant, and gets an embed-snippet placeholder for a future hosted widget.

## MVP features

- Business FAQ / knowledge-base editor
- Local browser persistence
- Lightweight question matching
- Customer-chat preview
- Fallback when the assistant is not confident
- Copyable embed snippet
- No backend required for the demo

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server.

## Product roadmap

### Version 1
- Hosted accounts and business dashboards
- Real embeddable chat widget
- Secure API
- FAQ import from CSV/JSON
- Analytics: questions, unanswered questions, response rate

### Version 2
- AI-powered retrieval over approved business content
- Human handoff
- Multiple languages
- Custom branding
- Website crawler with explicit customer authorization
- Slack/email/webhook notifications

### Version 3
- GitHub Marketplace integration
- Paid subscriptions
- Team roles
- Usage-based limits
- Developer API and SDK

## Important production rule

The assistant should answer from business-approved information and clearly say when it does not know. Do not allow it to invent prices, policies, availability, legal claims, or other business facts.

## License

MIT
