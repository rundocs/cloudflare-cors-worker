.PHONY: all
all: install check

.PHONY: install
install:
	@pnpm i
	@pnpm wrangler types

.PHONY: check
check:
	@pnpm tsc --noEmit

.PHONY: dev
dev:
	@pnpm wrangler dev

.PHONY: update
update:
	@pnpm update --latest
