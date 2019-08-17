# 6. domain folder for business logic

Date: 17/08/2019

## Status

Accepted

## Context

As the app grows, there will be a large amount of business logic. Having this split out and contained will assist in extension and refactor work and keep core business logic seperate from infrastructure.

Onion architecture is a concept of keeping business logic at the heart of software and layering infrastructure and other concerns on top.

## Decision

A domain folder will be used to store all of the business logic.

Objects will be dumb data containers rather than rich domain objects. Functions will be used to interact in an immutable manner.

Core algorithms will follow the strategy pattern to enable swapping out.

## Consequences

Clear location for domain logic over interface concerns.

Immutability will make reasoning about the state of the system easier.

Strategy pattern allows us to add new algorithms without changing implementation details.
